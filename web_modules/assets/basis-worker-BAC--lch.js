/* global BASIS, importScripts */

// Classic worker: the Basis transcoder is a UMD script with no ESM export, so
// it is pulled in with importScripts rather than a dynamic import, keeping the
// worker free of `new Function` and its CSP `unsafe-eval` requirement.

// basis_universal transcoder target formats (basisu_transcoder.h).
const TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16,
};

const BasisFormat = { ETC1S: 0, UASTC_4x4: 1 };

// Transcode targets, best first. WebGPU has no PVRTC, ATC or ETC1 equivalent,
// so those targets are gone: only BC, ETC2 and ASTC survive, which also
// removes the power-of-two constraint PVRTC needed. `feature` is a WebGPU
// device feature minus its "texture-compression-" prefix.
//
// ETC1 transcoder output is uploaded as etc2-rgb8unorm: an ETC1 block is a
// valid ETC2 RGB8 block, and WebGPU only exposes the ETC2 superset.
const FORMAT_OPTIONS = [
  {
    feature: "astc",
    basisFormat: [BasisFormat.UASTC_4x4],
    transcoderFormat: [TranscoderFormat.ASTC_4x4, TranscoderFormat.ASTC_4x4],
    format: ["astc-4x4-unorm", "astc-4x4-unorm"],
    priorityETC1S: Infinity,
    priorityUASTC: 1,
  },
  {
    feature: "bc",
    basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
    transcoderFormat: [TranscoderFormat.BC7_M5, TranscoderFormat.BC7_M5],
    format: ["bc7-rgba-unorm", "bc7-rgba-unorm"],
    priorityETC1S: 3,
    priorityUASTC: 2,
  },
  {
    feature: "etc2",
    basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
    transcoderFormat: [TranscoderFormat.ETC1, TranscoderFormat.ETC2],
    format: ["etc2-rgb8unorm", "etc2-rgba8unorm"],
    priorityETC1S: 1,
    priorityUASTC: 3,
  },
  {
    feature: "bc",
    basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
    transcoderFormat: [TranscoderFormat.BC1, TranscoderFormat.BC3],
    format: ["bc1-rgba-unorm", "bc3-rgba-unorm"],
    priorityETC1S: 4,
    priorityUASTC: 5,
  },
];

// toSorted, not sort: sorting in place would alias these two to each other and
// to FORMAT_OPTIONS, leaving ETC1S ordered by UASTC priority — which notably
// promotes ASTC to first despite its priorityETC1S of Infinity.
const ETC1S_OPTIONS = FORMAT_OPTIONS.toSorted(
  (a, b) => a.priorityETC1S - b.priorityETC1S,
);
const UASTC_OPTIONS = FORMAT_OPTIONS.toSorted(
  (a, b) => a.priorityUASTC - b.priorityUASTC,
);

let config;
let transcoderPending;
let BasisModule;

function init({ transcoderUrl, wasmBinary, features }) {
  const { promise, resolve, reject } = Promise.withResolvers();
  try {
    importScripts(transcoderUrl);
    BasisModule = { wasmBinary, onRuntimeInitialized: resolve };
    BASIS(BasisModule);
  } catch (error) {
    reject(error);
  }
  return promise.then(() => {
    BasisModule.initializeBasis();
    config = { features };
  });
}

/**
 * Picks the transcode target for a texture, and the WebGPU format its output
 * is uploaded as. Falls back to uncompressed rgba8unorm when the device
 * supports none of the compressed families.
 */
function getTranscoderFormat(basisFormat, hasAlpha, colorSpace) {
  const srgb = colorSpace === "srgb" ? "-srgb" : "";
  const options =
    basisFormat === BasisFormat.ETC1S ? ETC1S_OPTIONS : UASTC_OPTIONS;

  for (const option of options) {
    if (!config.features[option.feature]) continue;
    if (!option.basisFormat.includes(basisFormat)) continue;

    const index = hasAlpha ? 1 : 0;
    return {
      transcoderFormat: option.transcoderFormat[index],
      format: `${option.format[index]}${srgb}`,
    };
  }

  // WebGPU only reports a feature the device was created with, so this is as
  // likely to mean "not requested" as "not supported".
  console.warn(
    "BasisWorker: device exposes no compressed-texture feature (bc/etc2/astc); decoding to uncompressed rgba8unorm. If the hardware does support them, the context was created without those features.",
  );
  return {
    transcoderFormat: TranscoderFormat.RGBA32,
    format: `rgba8unorm${srgb}`,
  };
}

const widthInBlocks = (transcoderFormat, width) =>
  Math.ceil(width / BasisModule.getFormatBlockWidth(transcoderFormat));

const heightInBlocks = (transcoderFormat, height) =>
  Math.ceil(height / BasisModule.getFormatBlockHeight(transcoderFormat));

function transcodedByteLength(transcoderFormat, width, height) {
  const blockByteLength = BasisModule.getBytesPerBlockOrPixel(transcoderFormat);

  if (BasisModule.formatIsUncompressed(transcoderFormat)) {
    return width * height * blockByteLength;
  }
  return (
    widthInBlocks(transcoderFormat, width) *
    heightInBlocks(transcoderFormat, height) *
    blockByteLength
  );
}

/** KTX2 path: levels and (for ETC1S) palettes are supplied by the container. */
function transcodeLowLevel(taskConfig) {
  const { basisFormat, width, height, hasAlpha, colorSpace } = taskConfig;
  const { transcoderFormat, format } = getTranscoderFormat(
    basisFormat,
    hasAlpha,
    colorSpace,
  );

  if (!BasisModule.isFormatSupported(transcoderFormat)) {
    throw new Error(
      `BasisWorker: transcoder does not support format ${transcoderFormat}.`,
    );
  }

  const blockByteLength = BasisModule.getBytesPerBlockOrPixel(transcoderFormat);
  const levels = [];

  const transcodeLevel = (level, transcode) => {
    const byteLength = transcodedByteLength(
      transcoderFormat,
      level.width,
      level.height,
    );
    const data = new Uint8Array(byteLength);
    if (!transcode(data, byteLength / blockByteLength)) {
      throw new Error(
        `BasisWorker: transcode failed for level ${level.index}.`,
      );
    }
    levels.push({ data, width: level.width, height: level.height });
  };

  if (basisFormat === BasisFormat.ETC1S) {
    const transcoder = new BasisModule.LowLevelETC1SImageTranscoder();
    const {
      endpointCount,
      endpointsData,
      selectorCount,
      selectorsData,
      tablesData,
      imageDescs,
    } = taskConfig.globalData;

    try {
      if (
        !transcoder.decodePalettes(
          endpointCount,
          endpointsData,
          selectorCount,
          selectorsData,
        )
      ) {
        throw new Error("BasisWorker: decodePalettes() failed.");
      }
      if (!transcoder.decodeTables(tablesData)) {
        throw new Error("BasisWorker: decodeTables() failed.");
      }

      for (const [i, level] of taskConfig.levels.entries()) {
        const imageDesc = imageDescs[i];
        transcodeLevel(level, (dst, blocks) =>
          transcoder.transcodeImage(
            transcoderFormat,
            dst,
            blocks,
            level.data,
            widthInBlocks(transcoderFormat, level.width),
            heightInBlocks(transcoderFormat, level.height),
            level.width,
            level.height,
            level.index,
            imageDesc.rgbSliceByteOffset,
            imageDesc.rgbSliceByteLength,
            imageDesc.alphaSliceByteOffset,
            imageDesc.alphaSliceByteLength,
            imageDesc.imageFlags,
            hasAlpha,
            false,
            0,
            0,
          ),
        );
      }
    } finally {
      transcoder.delete();
    }
  } else {
    for (const level of taskConfig.levels) {
      transcodeLevel(level, (dst, blocks) =>
        BasisModule.transcodeUASTCImage(
          basisFormat,
          transcoderFormat,
          dst,
          blocks,
          level.data,
          widthInBlocks(transcoderFormat, level.width),
          heightInBlocks(transcoderFormat, level.height),
          level.width,
          level.height,
          level.index,
          0,
          level.data.byteLength,
          0,
          hasAlpha,
          false,
          0,
          0,
          -1,
          -1,
        ),
      );
    }
  }

  return { width, height, hasAlpha, levels, format };
}

/** Standalone .basis path: the file describes its own levels. */
function transcode(buffer, colorSpace) {
  const basisFile = new BasisModule.BasisFile(new Uint8Array(buffer));

  const basisFormat = basisFile.isUASTC()
    ? BasisFormat.UASTC_4x4
    : BasisFormat.ETC1S;
  const width = basisFile.getImageWidth(0, 0);
  const height = basisFile.getImageHeight(0, 0);
  const levelCount = basisFile.getNumLevels(0);
  const hasAlpha = basisFile.getHasAlpha();

  const cleanup = () => {
    basisFile.close();
    basisFile.delete();
  };

  try {
    if (!width || !height || !levelCount) {
      throw new Error("BasisWorker: invalid texture.");
    }

    const { transcoderFormat, format } = getTranscoderFormat(
      basisFormat,
      hasAlpha,
      colorSpace,
    );

    if (!basisFile.startTranscoding()) {
      throw new Error("BasisWorker: startTranscoding() failed.");
    }

    const levels = [];
    for (let mip = 0; mip < levelCount; mip++) {
      const data = new Uint8Array(
        basisFile.getImageTranscodedSizeInBytes(0, mip, transcoderFormat),
      );
      if (
        !basisFile.transcodeImage(data, 0, mip, transcoderFormat, 0, hasAlpha)
      ) {
        throw new Error(
          `BasisWorker: transcodeImage() failed for level ${mip}.`,
        );
      }
      levels.push({
        data,
        width: basisFile.getImageWidth(0, mip),
        height: basisFile.getImageHeight(0, mip),
      });
    }

    return { width, height, hasAlpha, levels, format };
  } finally {
    cleanup();
  }
}

self.onmessage = async ({ data: message }) => {
  switch (message.type) {
    case "init": {
      transcoderPending = init(message.config);
      // Surface a failed transcoder load rather than leaving decodes pending.
      try {
        await transcoderPending;
      } catch (error) {
        self.postMessage({ type: "error", id: null, error: error.message });
      }
      break;
    }
    case "decode": {
      try {
        await transcoderPending;
        const { taskConfig } = message;
        const result = taskConfig.lowLevel
          ? transcodeLowLevel(taskConfig)
          : transcode(message.buffers[0], taskConfig.colorSpace);

        self.postMessage(
          { type: "decode", id: message.id, ...result },
          // List buffers to make them transferable
          result.levels.map(({ data }) => data.buffer),
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
        error: `BasisWorker: unknown message type "${message.type}".`,
      });
  }
};
