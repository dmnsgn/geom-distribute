/* global DracoDecoderModule, importScripts */

// Classic worker: the Draco glue is a UMD script with no ESM export, so it is
// pulled in with importScripts rather than a dynamic import. That also keeps
// the worker free of `new Function`, which a module worker would need and
// which CSP `unsafe-eval` would have to allow.

// Attribute types arrive as strings — TypedArray constructors are not
// structured-cloneable. Explicit map rather than a global lookup by name.
const TYPED_ARRAYS = {
  Float32Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
};

const DRACO_DATA_TYPES = new Map([
  [Float32Array, "DT_FLOAT32"],
  [Int8Array, "DT_INT8"],
  [Int16Array, "DT_INT16"],
  [Int32Array, "DT_INT32"],
  [Uint8Array, "DT_UINT8"],
  [Uint16Array, "DT_UINT16"],
  [Uint32Array, "DT_UINT32"],
]);

let decoderPending;

function init({ wrapperUrl, wasmBinary }) {
  const { promise, resolve, reject } = Promise.withResolvers();
  try {
    importScripts(wrapperUrl);
    DracoDecoderModule({ wasmBinary, onModuleLoaded: resolve });
  } catch (error) {
    reject(error);
  }
  return promise;
}

// Copies `byteLength` bytes out of the Draco heap into a standalone typed
// array. The heap is read after the call that fills it: Emscripten can grow
// (and therefore replace) the underlying ArrayBuffer during the decode.
function readHeap(draco, TypedArray, byteLength, length, fill) {
  const ptr = draco._malloc(byteLength);
  try {
    fill(ptr);
    return new TypedArray(draco.HEAPU8.buffer, ptr, length).slice();
  } finally {
    draco._free(ptr);
  }
}

function decodeIndices(draco, decoder, dracoGeometry) {
  const numIndices = dracoGeometry.num_faces() * 3;
  const data = readHeap(
    draco,
    Uint32Array,
    numIndices * Uint32Array.BYTES_PER_ELEMENT,
    numIndices,
    (ptr) =>
      decoder.GetTrianglesUInt32Array(
        dracoGeometry,
        numIndices * Uint32Array.BYTES_PER_ELEMENT,
        ptr,
      ),
  );
  return { data, itemSize: 1 };
}

function decodeAttribute(draco, decoder, dracoGeometry, TypedArray, attribute) {
  const itemSize = attribute.num_components();
  const numValues = dracoGeometry.num_points() * itemSize;
  const byteLength = numValues * TypedArray.BYTES_PER_ELEMENT;
  const dataType = draco[DRACO_DATA_TYPES.get(TypedArray)];

  const data = readHeap(draco, TypedArray, byteLength, numValues, (ptr) =>
    decoder.GetAttributeDataArrayForAllPoints(
      dracoGeometry,
      attribute,
      dataType,
      byteLength,
      ptr,
    ),
  );
  return { data, itemSize };
}

function decodeGeometry(
  draco,
  decoder,
  decoderBuffer,
  { attributeIDs, attributeTypes, useUniqueIDs },
) {
  const geometryType = decoder.GetEncodedGeometryType(decoderBuffer);

  let dracoGeometry;
  let decodingStatus;

  if (geometryType === draco.TRIANGULAR_MESH) {
    dracoGeometry = new draco.Mesh();
    decodingStatus = decoder.DecodeBufferToMesh(decoderBuffer, dracoGeometry);
  } else if (geometryType === draco.POINT_CLOUD) {
    dracoGeometry = new draco.PointCloud();
    decodingStatus = decoder.DecodeBufferToPointCloud(
      decoderBuffer,
      dracoGeometry,
    );
  } else {
    throw new Error("DracoWorker: unexpected geometry type.");
  }

  try {
    if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
      throw new Error(
        `DracoWorker: decoding failed: ${decodingStatus.error_msg()}`,
      );
    }

    const geometry = {};

    for (const name of Object.keys(attributeIDs)) {
      const TypedArray = TYPED_ARRAYS[attributeTypes[name]];
      if (!TypedArray) {
        throw new Error(
          `DracoWorker: unsupported attribute type "${attributeTypes[name]}".`,
        );
      }

      // A Draco file may be created with default vertex attributes, whose
      // attribute IDs are mapped 1:1 from their semantic name (POSITION,
      // NORMAL, ...). Alternatively it may contain a custom set of attributes,
      // identified by known unique IDs. glTF files always do the latter, and
      // `.drc` files typically do the former.
      let attribute;
      if (useUniqueIDs) {
        attribute = decoder.GetAttributeByUniqueId(
          dracoGeometry,
          attributeIDs[name],
        );
      } else {
        // Draco names only POSITION/NORMAL/COLOR/TEX_COORD/GENERIC. Anything
        // else is `undefined` here, which embind would coerce to 0 — silently
        // returning POSITION data under the wrong name.
        const namedType = draco[attributeIDs[name]];
        if (typeof namedType !== "number") {
          throw new Error(
            `DracoWorker: "${attributeIDs[name]}" is not a Draco attribute type (POSITION, NORMAL, COLOR, TEX_COORD, GENERIC). Semantics such as TANGENT or JOINTS_0 exist only as generic attributes: pass their unique IDs with useUniqueIDs.`,
          );
        }

        const attributeID = decoder.GetAttributeId(dracoGeometry, namedType);
        if (attributeID === -1) continue;
        attribute = decoder.GetAttribute(dracoGeometry, attributeID);
      }

      geometry[name] = decodeAttribute(
        draco,
        decoder,
        dracoGeometry,
        TypedArray,
        attribute,
      );
    }

    if (geometryType === draco.TRIANGULAR_MESH) {
      geometry.indices = decodeIndices(draco, decoder, dracoGeometry);
    }

    return geometry;
  } finally {
    draco.destroy(dracoGeometry);
  }
}

async function decode({ buffer, taskConfig }) {
  const draco = await decoderPending;

  const decoder = new draco.Decoder();
  const decoderBuffer = new draco.DecoderBuffer();
  try {
    decoderBuffer.Init(new Int8Array(buffer), buffer.byteLength);
    return decodeGeometry(draco, decoder, decoderBuffer, taskConfig);
  } finally {
    draco.destroy(decoderBuffer);
    draco.destroy(decoder);
  }
}

self.onmessage = async ({ data: message }) => {
  switch (message.type) {
    case "init": {
      decoderPending = init(message.config);
      // Surface a failed module load instead of leaving every decode pending.
      try {
        await decoderPending;
      } catch (error) {
        self.postMessage({ type: "error", id: null, error: error.message });
      }
      break;
    }
    case "decode": {
      try {
        const geometry = await decode(message);
        self.postMessage(
          { type: "decode", id: message.id, geometry },
          // List buffers to make them transferable
          Object.values(geometry).map(({ data }) => data.buffer),
        );
      } catch (error) {
        self.postMessage({
          type: "error",
          id: message.id,
          error: error.message,
        });
      }
      break;
    }
    default:
      self.postMessage({
        type: "error",
        id: message.id ?? null,
        error: `DracoWorker: unknown message type "${message.type}".`,
      });
  }
};
