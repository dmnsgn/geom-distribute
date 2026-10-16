import { S as textureSamplerDeclaration, c as createBindingAllocator, l as formatShader, n as fullscreenVertex, r as postProcessingStruct } from "./common-BiA813CC.js";
import { i as glslMod, l as random, u as saturate } from "./math-CwQZH5H7.js";
import { t as encode_decode_default } from "./encode-decode-DxwgT9tU.js";
import { t as luma_default } from "./luma-CYejMNwF.js";

/**
* Reference Implementation: https://github.com/stegu/webgl-noise
*
* Copyright (C) 2011 by Ashima Arts (Simplex noise) Copyright (C) 2011-2016 by
* Stefan Gustavson (Classic noise and others)
*
* @type {object}
* @alias module:shaders.noise
*/
const common = `
fn mod289F32(x: f32) -> f32 {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn mod289Vec2(x: vec2f) -> vec2f {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn mod289Vec3(x: vec3f) -> vec3f {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn mod289Vec4(x: vec4f) -> vec4f {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

fn permuteF32(x: f32) -> f32 {
  return mod289F32(((x * 34.0) + 10.0) * x);
}
fn permuteVec3(x: vec3f) -> vec3f {
  return mod289Vec3(((x * 34.0) + 10.0) * x);
}
fn permuteVec4(x: vec4f) -> vec4f {
  return mod289Vec4(((x * 34.0) + 10.0) * x);
}

fn taylorInvSqrtF32(r: f32) -> f32 {
  return 1.79284291400159 - 0.85373472095314 * r;
}
fn taylorInvSqrtVec4(r: vec4f) -> vec4f {
  return vec4f(1.79284291400159) - 0.85373472095314 * r;
}

fn fadeVec2(t: vec2f) -> vec2f {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
fn fadeVec3(t: vec3f) -> vec3f {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
fn fadeVec4(t: vec4f) -> vec4f {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

fn grad4(j: f32, ip: vec4f) -> vec4f {
  let ones = vec4f(1.0, 1.0, 1.0, -1.0);
  var p: vec4f;

  p = vec4f(floor(fract(vec3f(j) * ip.xyz) * 7.0) * ip.z - 1.0, p.w);
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  let s = vec4f(p < vec4f(0.0));
  p = vec4f(p.xyz + (s.xyz * 2.0 - 1.0) * s.www, p.w);

  return p;
}

// (sqrt(5) - 1)/4 = F4, used once below
const F4: f32 = 0.309016994374947451;
`;
const perlin = `
// 2D
// Classic Perlin noise
fn cnoiseVec2(P: vec2f) -> f32 {
  var Pi = floor(P.xyxy) + vec4f(0.0, 0.0, 1.0, 1.0);
  let Pf = fract(P.xyxy) - vec4f(0.0, 0.0, 1.0, 1.0);
  Pi = mod289Vec4(Pi); // To avoid truncation effects in permutation
  let ix = Pi.xzxz;
  let iy = Pi.yyww;
  let fx = Pf.xzxz;
  let fy = Pf.yyww;

  let i = permuteVec4(permuteVec4(ix) + iy);

  var gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  let gy = abs(gx) - 0.5;
  let tx = floor(gx + 0.5);
  gx = gx - tx;

  var g00 = vec2f(gx.x, gy.x);
  var g10 = vec2f(gx.y, gy.y);
  var g01 = vec2f(gx.z, gy.z);
  var g11 = vec2f(gx.w, gy.w);

  let norm = taylorInvSqrtVec4(vec4f(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  let n00 = dot(g00, vec2f(fx.x, fy.x));
  let n10 = dot(g10, vec2f(fx.y, fy.y));
  let n01 = dot(g01, vec2f(fx.z, fy.z));
  let n11 = dot(g11, vec2f(fx.w, fy.w));

  let fade_xy = fadeVec2(Pf.xy);
  let n_x = mix(vec2f(n00, n01), vec2f(n10, n11), fade_xy.x);
  let n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// Classic Perlin noise, periodic variant
fn pnoiseVec2(P: vec2f, rep: vec2f) -> f32 {
  var Pi = floor(P.xyxy) + vec4f(0.0, 0.0, 1.0, 1.0);
  let Pf = fract(P.xyxy) - vec4f(0.0, 0.0, 1.0, 1.0);
  Pi = glslModVec4(Pi, rep.xyxy); // To create noise with explicit period
  Pi = mod289Vec4(Pi);            // To avoid truncation effects in permutation
  let ix = Pi.xzxz;
  let iy = Pi.yyww;
  let fx = Pf.xzxz;
  let fy = Pf.yyww;

  let i = permuteVec4(permuteVec4(ix) + iy);

  var gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  let gy = abs(gx) - 0.5;
  let tx = floor(gx + 0.5);
  gx = gx - tx;

  var g00 = vec2f(gx.x, gy.x);
  var g10 = vec2f(gx.y, gy.y);
  var g01 = vec2f(gx.z, gy.z);
  var g11 = vec2f(gx.w, gy.w);

  let norm = taylorInvSqrtVec4(vec4f(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  let n00 = dot(g00, vec2f(fx.x, fy.x));
  let n10 = dot(g10, vec2f(fx.y, fy.y));
  let n01 = dot(g01, vec2f(fx.z, fy.z));
  let n11 = dot(g11, vec2f(fx.w, fy.w));

  let fade_xy = fadeVec2(Pf.xy);
  let n_x = mix(vec2f(n00, n01), vec2f(n10, n11), fade_xy.x);
  let n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// 3D
// Classic Perlin noise
fn cnoiseVec3(P: vec3f) -> f32 {
  var Pi0 = floor(P); // Integer part for indexing
  var Pi1 = Pi0 + vec3f(1.0); // Integer part + 1
  Pi0 = mod289Vec3(Pi0);
  Pi1 = mod289Vec3(Pi1);
  let Pf0 = fract(P); // Fractional part for interpolation
  let Pf1 = Pf0 - vec3f(1.0); // Fractional part - 1.0
  let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  let iy = vec4f(Pi0.yy, Pi1.yy);
  let iz0 = vec4f(Pi0.zzzz);
  let iz1 = vec4f(Pi1.zzzz);

  let ixy = permuteVec4(permuteVec4(ix) + iy);
  let ixy0 = permuteVec4(ixy + iz0);
  let ixy1 = permuteVec4(ixy + iz1);

  var gx0 = ixy0 * (1.0 / 7.0);
  var gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  var gz0 = vec4f(0.5) - abs(gx0) - abs(gy0);
  let sz0 = step(gz0, vec4f(0.0));
  gx0 -= sz0 * (step(vec4f(0.0), gx0) - 0.5);
  gy0 -= sz0 * (step(vec4f(0.0), gy0) - 0.5);

  var gx1 = ixy1 * (1.0 / 7.0);
  var gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  var gz1 = vec4f(0.5) - abs(gx1) - abs(gy1);
  let sz1 = step(gz1, vec4f(0.0));
  gx1 -= sz1 * (step(vec4f(0.0), gx1) - 0.5);
  gy1 -= sz1 * (step(vec4f(0.0), gy1) - 0.5);

  var g000 = vec3f(gx0.x, gy0.x, gz0.x);
  var g100 = vec3f(gx0.y, gy0.y, gz0.y);
  var g010 = vec3f(gx0.z, gy0.z, gz0.z);
  var g110 = vec3f(gx0.w, gy0.w, gz0.w);
  var g001 = vec3f(gx1.x, gy1.x, gz1.x);
  var g101 = vec3f(gx1.y, gy1.y, gz1.y);
  var g011 = vec3f(gx1.z, gy1.z, gz1.z);
  var g111 = vec3f(gx1.w, gy1.w, gz1.w);

  let norm0 = taylorInvSqrtVec4(vec4f(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  let norm1 = taylorInvSqrtVec4(vec4f(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  let n000 = dot(g000, Pf0);
  let n100 = dot(g100, vec3f(Pf1.x, Pf0.yz));
  let n010 = dot(g010, vec3f(Pf0.x, Pf1.y, Pf0.z));
  let n110 = dot(g110, vec3f(Pf1.xy, Pf0.z));
  let n001 = dot(g001, vec3f(Pf0.xy, Pf1.z));
  let n101 = dot(g101, vec3f(Pf1.x, Pf0.y, Pf1.z));
  let n011 = dot(g011, vec3f(Pf0.x, Pf1.yz));
  let n111 = dot(g111, Pf1);

  let fade_xyz = fadeVec3(Pf0);
  let n_z = mix(vec4f(n000, n100, n010, n110), vec4f(n001, n101, n011, n111), fade_xyz.z);
  let n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  let n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

// Classic Perlin noise, periodic variant
fn pnoiseVec3(P: vec3f, rep: vec3f) -> f32 {
  var Pi0 = glslModVec3(floor(P), rep); // Integer part, modulo period
  var Pi1 = glslModVec3(Pi0 + vec3f(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289Vec3(Pi0);
  Pi1 = mod289Vec3(Pi1);
  let Pf0 = fract(P); // Fractional part for interpolation
  let Pf1 = Pf0 - vec3f(1.0); // Fractional part - 1.0
  let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  let iy = vec4f(Pi0.yy, Pi1.yy);
  let iz0 = vec4f(Pi0.zzzz);
  let iz1 = vec4f(Pi1.zzzz);

  let ixy = permuteVec4(permuteVec4(ix) + iy);
  let ixy0 = permuteVec4(ixy + iz0);
  let ixy1 = permuteVec4(ixy + iz1);

  var gx0 = ixy0 * (1.0 / 7.0);
  var gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  var gz0 = vec4f(0.5) - abs(gx0) - abs(gy0);
  let sz0 = step(gz0, vec4f(0.0));
  gx0 -= sz0 * (step(vec4f(0.0), gx0) - 0.5);
  gy0 -= sz0 * (step(vec4f(0.0), gy0) - 0.5);

  var gx1 = ixy1 * (1.0 / 7.0);
  var gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  var gz1 = vec4f(0.5) - abs(gx1) - abs(gy1);
  let sz1 = step(gz1, vec4f(0.0));
  gx1 -= sz1 * (step(vec4f(0.0), gx1) - 0.5);
  gy1 -= sz1 * (step(vec4f(0.0), gy1) - 0.5);

  var g000 = vec3f(gx0.x, gy0.x, gz0.x);
  var g100 = vec3f(gx0.y, gy0.y, gz0.y);
  var g010 = vec3f(gx0.z, gy0.z, gz0.z);
  var g110 = vec3f(gx0.w, gy0.w, gz0.w);
  var g001 = vec3f(gx1.x, gy1.x, gz1.x);
  var g101 = vec3f(gx1.y, gy1.y, gz1.y);
  var g011 = vec3f(gx1.z, gy1.z, gz1.z);
  var g111 = vec3f(gx1.w, gy1.w, gz1.w);

  let norm0 = taylorInvSqrtVec4(vec4f(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  let norm1 = taylorInvSqrtVec4(vec4f(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  let n000 = dot(g000, Pf0);
  let n100 = dot(g100, vec3f(Pf1.x, Pf0.yz));
  let n010 = dot(g010, vec3f(Pf0.x, Pf1.y, Pf0.z));
  let n110 = dot(g110, vec3f(Pf1.xy, Pf0.z));
  let n001 = dot(g001, vec3f(Pf0.xy, Pf1.z));
  let n101 = dot(g101, vec3f(Pf1.x, Pf0.y, Pf1.z));
  let n011 = dot(g011, vec3f(Pf0.x, Pf1.yz));
  let n111 = dot(g111, Pf1);

  let fade_xyz = fadeVec3(Pf0);
  let n_z = mix(vec4f(n000, n100, n010, n110), vec4f(n001, n101, n011, n111), fade_xyz.z);
  let n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  let n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

// 4D
// Classic Perlin noise
fn cnoiseVec4(P: vec4f) -> f32 {
  var Pi0 = floor(P); // Integer part for indexing
  var Pi1 = Pi0 + 1.0; // Integer part + 1
  Pi0 = mod289Vec4(Pi0);
  Pi1 = mod289Vec4(Pi1);
  let Pf0 = fract(P); // Fractional part for interpolation
  let Pf1 = Pf0 - 1.0; // Fractional part - 1.0
  let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  let iy = vec4f(Pi0.yy, Pi1.yy);
  let iz0 = vec4f(Pi0.zzzz);
  let iz1 = vec4f(Pi1.zzzz);
  let iw0 = vec4f(Pi0.wwww);
  let iw1 = vec4f(Pi1.wwww);

  let ixy = permuteVec4(permuteVec4(ix) + iy);
  let ixy0 = permuteVec4(ixy + iz0);
  let ixy1 = permuteVec4(ixy + iz1);
  let ixy00 = permuteVec4(ixy0 + iw0);
  let ixy01 = permuteVec4(ixy0 + iw1);
  let ixy10 = permuteVec4(ixy1 + iw0);
  let ixy11 = permuteVec4(ixy1 + iw1);

  var gx00 = ixy00 * (1.0 / 7.0);
  var gy00 = floor(gx00) * (1.0 / 7.0);
  var gz00 = floor(gy00) * (1.0 / 6.0);
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  var gw00 = vec4f(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  let sw00 = step(gw00, vec4f(0.0));
  gx00 -= sw00 * (step(vec4f(0.0), gx00) - 0.5);
  gy00 -= sw00 * (step(vec4f(0.0), gy00) - 0.5);

  var gx01 = ixy01 * (1.0 / 7.0);
  var gy01 = floor(gx01) * (1.0 / 7.0);
  var gz01 = floor(gy01) * (1.0 / 6.0);
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  var gw01 = vec4f(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  let sw01 = step(gw01, vec4f(0.0));
  gx01 -= sw01 * (step(vec4f(0.0), gx01) - 0.5);
  gy01 -= sw01 * (step(vec4f(0.0), gy01) - 0.5);

  var gx10 = ixy10 * (1.0 / 7.0);
  var gy10 = floor(gx10) * (1.0 / 7.0);
  var gz10 = floor(gy10) * (1.0 / 6.0);
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  var gw10 = vec4f(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  let sw10 = step(gw10, vec4f(0.0));
  gx10 -= sw10 * (step(vec4f(0.0), gx10) - 0.5);
  gy10 -= sw10 * (step(vec4f(0.0), gy10) - 0.5);

  var gx11 = ixy11 * (1.0 / 7.0);
  var gy11 = floor(gx11) * (1.0 / 7.0);
  var gz11 = floor(gy11) * (1.0 / 6.0);
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  var gw11 = vec4f(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  let sw11 = step(gw11, vec4f(0.0));
  gx11 -= sw11 * (step(vec4f(0.0), gx11) - 0.5);
  gy11 -= sw11 * (step(vec4f(0.0), gy11) - 0.5);

  var g0000 = vec4f(gx00.x, gy00.x, gz00.x, gw00.x);
  var g1000 = vec4f(gx00.y, gy00.y, gz00.y, gw00.y);
  var g0100 = vec4f(gx00.z, gy00.z, gz00.z, gw00.z);
  var g1100 = vec4f(gx00.w, gy00.w, gz00.w, gw00.w);
  var g0010 = vec4f(gx10.x, gy10.x, gz10.x, gw10.x);
  var g1010 = vec4f(gx10.y, gy10.y, gz10.y, gw10.y);
  var g0110 = vec4f(gx10.z, gy10.z, gz10.z, gw10.z);
  var g1110 = vec4f(gx10.w, gy10.w, gz10.w, gw10.w);
  var g0001 = vec4f(gx01.x, gy01.x, gz01.x, gw01.x);
  var g1001 = vec4f(gx01.y, gy01.y, gz01.y, gw01.y);
  var g0101 = vec4f(gx01.z, gy01.z, gz01.z, gw01.z);
  var g1101 = vec4f(gx01.w, gy01.w, gz01.w, gw01.w);
  var g0011 = vec4f(gx11.x, gy11.x, gz11.x, gw11.x);
  var g1011 = vec4f(gx11.y, gy11.y, gz11.y, gw11.y);
  var g0111 = vec4f(gx11.z, gy11.z, gz11.z, gw11.z);
  var g1111 = vec4f(gx11.w, gy11.w, gz11.w, gw11.w);

  let norm00 = taylorInvSqrtVec4(vec4f(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  let norm01 = taylorInvSqrtVec4(vec4f(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  let norm10 = taylorInvSqrtVec4(vec4f(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  let norm11 = taylorInvSqrtVec4(vec4f(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  let n0000 = dot(g0000, Pf0);
  let n1000 = dot(g1000, vec4f(Pf1.x, Pf0.yzw));
  let n0100 = dot(g0100, vec4f(Pf0.x, Pf1.y, Pf0.zw));
  let n1100 = dot(g1100, vec4f(Pf1.xy, Pf0.zw));
  let n0010 = dot(g0010, vec4f(Pf0.xy, Pf1.z, Pf0.w));
  let n1010 = dot(g1010, vec4f(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  let n0110 = dot(g0110, vec4f(Pf0.x, Pf1.yz, Pf0.w));
  let n1110 = dot(g1110, vec4f(Pf1.xyz, Pf0.w));
  let n0001 = dot(g0001, vec4f(Pf0.xyz, Pf1.w));
  let n1001 = dot(g1001, vec4f(Pf1.x, Pf0.yz, Pf1.w));
  let n0101 = dot(g0101, vec4f(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  let n1101 = dot(g1101, vec4f(Pf1.xy, Pf0.z, Pf1.w));
  let n0011 = dot(g0011, vec4f(Pf0.xy, Pf1.zw));
  let n1011 = dot(g1011, vec4f(Pf1.x, Pf0.y, Pf1.zw));
  let n0111 = dot(g0111, vec4f(Pf0.x, Pf1.yzw));
  let n1111 = dot(g1111, Pf1);

  let fade_xyzw = fadeVec4(Pf0);
  let n_0w = mix(vec4f(n0000, n1000, n0100, n1100), vec4f(n0001, n1001, n0101, n1101), fade_xyzw.w);
  let n_1w = mix(vec4f(n0010, n1010, n0110, n1110), vec4f(n0011, n1011, n0111, n1111), fade_xyzw.w);
  let n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  let n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  let n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}

// Classic Perlin noise, periodic version
fn pnoiseVec4(P: vec4f, rep: vec4f) -> f32 {
  var Pi0 = glslModVec4(floor(P), rep); // Integer part modulo rep
  var Pi1 = glslModVec4(Pi0 + 1.0, rep); // Integer part + 1 mod rep
  Pi0 = mod289Vec4(Pi0);
  Pi1 = mod289Vec4(Pi1);
  let Pf0 = fract(P); // Fractional part for interpolation
  let Pf1 = Pf0 - 1.0; // Fractional part - 1.0
  let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  let iy = vec4f(Pi0.yy, Pi1.yy);
  let iz0 = vec4f(Pi0.zzzz);
  let iz1 = vec4f(Pi1.zzzz);
  let iw0 = vec4f(Pi0.wwww);
  let iw1 = vec4f(Pi1.wwww);

  let ixy = permuteVec4(permuteVec4(ix) + iy);
  let ixy0 = permuteVec4(ixy + iz0);
  let ixy1 = permuteVec4(ixy + iz1);
  let ixy00 = permuteVec4(ixy0 + iw0);
  let ixy01 = permuteVec4(ixy0 + iw1);
  let ixy10 = permuteVec4(ixy1 + iw0);
  let ixy11 = permuteVec4(ixy1 + iw1);

  var gx00 = ixy00 * (1.0 / 7.0);
  var gy00 = floor(gx00) * (1.0 / 7.0);
  var gz00 = floor(gy00) * (1.0 / 6.0);
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  var gw00 = vec4f(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  let sw00 = step(gw00, vec4f(0.0));
  gx00 -= sw00 * (step(vec4f(0.0), gx00) - 0.5);
  gy00 -= sw00 * (step(vec4f(0.0), gy00) - 0.5);

  var gx01 = ixy01 * (1.0 / 7.0);
  var gy01 = floor(gx01) * (1.0 / 7.0);
  var gz01 = floor(gy01) * (1.0 / 6.0);
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  var gw01 = vec4f(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  let sw01 = step(gw01, vec4f(0.0));
  gx01 -= sw01 * (step(vec4f(0.0), gx01) - 0.5);
  gy01 -= sw01 * (step(vec4f(0.0), gy01) - 0.5);

  var gx10 = ixy10 * (1.0 / 7.0);
  var gy10 = floor(gx10) * (1.0 / 7.0);
  var gz10 = floor(gy10) * (1.0 / 6.0);
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  var gw10 = vec4f(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  let sw10 = step(gw10, vec4f(0.0));
  gx10 -= sw10 * (step(vec4f(0.0), gx10) - 0.5);
  gy10 -= sw10 * (step(vec4f(0.0), gy10) - 0.5);

  var gx11 = ixy11 * (1.0 / 7.0);
  var gy11 = floor(gx11) * (1.0 / 7.0);
  var gz11 = floor(gy11) * (1.0 / 6.0);
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  var gw11 = vec4f(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  let sw11 = step(gw11, vec4f(0.0));
  gx11 -= sw11 * (step(vec4f(0.0), gx11) - 0.5);
  gy11 -= sw11 * (step(vec4f(0.0), gy11) - 0.5);

  var g0000 = vec4f(gx00.x, gy00.x, gz00.x, gw00.x);
  var g1000 = vec4f(gx00.y, gy00.y, gz00.y, gw00.y);
  var g0100 = vec4f(gx00.z, gy00.z, gz00.z, gw00.z);
  var g1100 = vec4f(gx00.w, gy00.w, gz00.w, gw00.w);
  var g0010 = vec4f(gx10.x, gy10.x, gz10.x, gw10.x);
  var g1010 = vec4f(gx10.y, gy10.y, gz10.y, gw10.y);
  var g0110 = vec4f(gx10.z, gy10.z, gz10.z, gw10.z);
  var g1110 = vec4f(gx10.w, gy10.w, gz10.w, gw10.w);
  var g0001 = vec4f(gx01.x, gy01.x, gz01.x, gw01.x);
  var g1001 = vec4f(gx01.y, gy01.y, gz01.y, gw01.y);
  var g0101 = vec4f(gx01.z, gy01.z, gz01.z, gw01.z);
  var g1101 = vec4f(gx01.w, gy01.w, gz01.w, gw01.w);
  var g0011 = vec4f(gx11.x, gy11.x, gz11.x, gw11.x);
  var g1011 = vec4f(gx11.y, gy11.y, gz11.y, gw11.y);
  var g0111 = vec4f(gx11.z, gy11.z, gz11.z, gw11.z);
  var g1111 = vec4f(gx11.w, gy11.w, gz11.w, gw11.w);

  let norm00 = taylorInvSqrtVec4(vec4f(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  let norm01 = taylorInvSqrtVec4(vec4f(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  let norm10 = taylorInvSqrtVec4(vec4f(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  let norm11 = taylorInvSqrtVec4(vec4f(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  let n0000 = dot(g0000, Pf0);
  let n1000 = dot(g1000, vec4f(Pf1.x, Pf0.yzw));
  let n0100 = dot(g0100, vec4f(Pf0.x, Pf1.y, Pf0.zw));
  let n1100 = dot(g1100, vec4f(Pf1.xy, Pf0.zw));
  let n0010 = dot(g0010, vec4f(Pf0.xy, Pf1.z, Pf0.w));
  let n1010 = dot(g1010, vec4f(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  let n0110 = dot(g0110, vec4f(Pf0.x, Pf1.yz, Pf0.w));
  let n1110 = dot(g1110, vec4f(Pf1.xyz, Pf0.w));
  let n0001 = dot(g0001, vec4f(Pf0.xyz, Pf1.w));
  let n1001 = dot(g1001, vec4f(Pf1.x, Pf0.yz, Pf1.w));
  let n0101 = dot(g0101, vec4f(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  let n1101 = dot(g1101, vec4f(Pf1.xy, Pf0.z, Pf1.w));
  let n0011 = dot(g0011, vec4f(Pf0.xy, Pf1.zw));
  let n1011 = dot(g1011, vec4f(Pf1.x, Pf0.y, Pf1.zw));
  let n0111 = dot(g0111, vec4f(Pf0.x, Pf1.yzw));
  let n1111 = dot(g1111, Pf1);

  let fade_xyzw = fadeVec4(Pf0);
  let n_0w = mix(vec4f(n0000, n1000, n0100, n1100), vec4f(n0001, n1001, n0101, n1101), fade_xyzw.w);
  let n_1w = mix(vec4f(n0010, n1010, n0110, n1110), vec4f(n0011, n1011, n0111, n1111), fade_xyzw.w);
  let n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  let n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  let n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}
`;

/**
* FXAA
*
* Paper:
*
* - https://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf
*
* Reference Implementations:
*
* - https://blog.simonrodriguez.fr/articles/2016/07/implementing_fxaa.html
* - https://gist.github.com/kosua20/0c506b81b3812ac900048059d2383126
*
* Updates: Damien Seguin (2023-10)
*
* @type {string}
* @alias module:shaders.fxaa
*/
var fxaa_default = `
// FXAA_EDGE_THRESHOLD_MIN/MAX are expected to be declared as \`override\` f32
// by the composing pipeline shader (defaults below match "High" quality).
override FXAA_EDGE_THRESHOLD_MIN: f32 = 0.0312; // 1 / 32
override FXAA_EDGE_THRESHOLD_MAX: f32 = 0.125; // 1 / 8

const FXAA_ITERATIONS: i32 = 12;
const FXAA_ONE_OVER_TWELVE: f32 = 1.0 / 12.0;

fn FXAA_QUALITY(q: i32) -> f32 {
  if (q < 5) {
    return 1.0;
  }
  if (q > 5) {
    if (q < 10) {
      return 2.0;
    }
    if (q < 11) {
      return 4.0;
    }
    return 8.0;
  }
  return 1.5;
}

// Performs FXAA post-process anti-aliasing as described in the Nvidia FXAA white paper and the associated shader code.
fn fxaa(
  lumaTexture: texture_2d<f32>,
  lumaTextureSampler: sampler,
  uv: vec2f,
  uvLeftUp: vec2f,
  uvRightUp: vec2f,
  uvLeftDown: vec2f,
  uvRightDown: vec2f,
  uvDown: vec2f,
  uvUp: vec2f,
  uvLeft: vec2f,
  uvRight: vec2f,
  texelSize: vec2f,
  subPixelQuality: f32
) -> vec2f {
  // Luma at the current fragment
  let lumaCenter = readLumaTexture(lumaTexture, lumaTextureSampler, uv);

  // Luma at the four direct neighbours of the current fragment.
  let lumaDown = readLumaTexture(lumaTexture, lumaTextureSampler, uvDown);
  let lumaUp = readLumaTexture(lumaTexture, lumaTextureSampler, uvUp);
  let lumaLeft = readLumaTexture(lumaTexture, lumaTextureSampler, uvLeft);
  let lumaRight = readLumaTexture(lumaTexture, lumaTextureSampler, uvRight);

  // Find the maximum and minimum luma around the current fragment.
  let lumaMin = min(lumaCenter, min(min(lumaDown, lumaUp), min(lumaLeft, lumaRight)));
  let lumaMax = max(lumaCenter, max(max(lumaDown, lumaUp), max(lumaLeft, lumaRight)));

  // Compute the delta.
  let lumaRange = lumaMax - lumaMin;

  // If the luma variation is lower that a threshold (or if we are in a really dark area), we are not on an edge, don't perform any AA.
  if (lumaRange < max(FXAA_EDGE_THRESHOLD_MIN, lumaMax * FXAA_EDGE_THRESHOLD_MAX)) {
    return uv;
  }

  // Query the 4 remaining corners lumas.
  let lumaDownLeft = readLumaTexture(lumaTexture, lumaTextureSampler, uvLeftDown);
  let lumaUpRight = readLumaTexture(lumaTexture, lumaTextureSampler, uvRightUp);
  let lumaUpLeft = readLumaTexture(lumaTexture, lumaTextureSampler, uvLeftUp);
  let lumaDownRight = readLumaTexture(lumaTexture, lumaTextureSampler, uvRightDown);

  // Combine the four edges lumas (using intermediary variables for future computations with the same values).
  let lumaDownUp = lumaDown + lumaUp;
  let lumaLeftRight = lumaLeft + lumaRight;

  // Same for corners
  let lumaLeftCorners = lumaDownLeft + lumaUpLeft;
  let lumaDownCorners = lumaDownLeft + lumaDownRight;
  let lumaRightCorners = lumaDownRight + lumaUpRight;
  let lumaUpCorners = lumaUpRight + lumaUpLeft;

  // Compute an estimation of the gradient along the horizontal and vertical axis.
  let edgeHorizontal =
    abs(-2.0 * lumaLeft + lumaLeftCorners) +
    abs(-2.0 * lumaCenter + lumaDownUp) * 2.0 +
    abs(-2.0 * lumaRight + lumaRightCorners);
  let edgeVertical =
    abs(-2.0 * lumaUp + lumaUpCorners) +
    abs(-2.0 * lumaCenter + lumaLeftRight) * 2.0 +
    abs(-2.0 * lumaDown + lumaDownCorners);

  // Is the local edge horizontal or vertical?
  let isHorizontal = edgeHorizontal >= edgeVertical;

  // Choose the step size (one pixel) accordingly.
  var stepLength = select(texelSize.x, texelSize.y, isHorizontal);

  // Select the two neighboring texels lumas in the opposite direction to the local edge.
  let luma1 = select(lumaLeft, lumaDown, isHorizontal);
  let luma2 = select(lumaRight, lumaUp, isHorizontal);

  // Compute gradients in this direction.
  let gradient1 = abs(luma1 - lumaCenter);
  let gradient2 = abs(luma2 - lumaCenter);

  // Which direction is the steepest?
  let is1Steepest = gradient1 >= gradient2;

  // Gradient in the corresponding direction, normalized.
  let gradientScaled = 0.25 * max(gradient1, gradient2);

  // Average luma in the correct direction.
  var lumaLocalAverage = 0.0;
  if (is1Steepest) {
    // Switch the direction
    stepLength = -stepLength;
    lumaLocalAverage = 0.5 * (luma1 + lumaCenter);
  } else {
    lumaLocalAverage = 0.5 * (luma2 + lumaCenter);
  }

  // Shift UV in the correct direction by half a pixel.
  var currentUv = uv;
  if (isHorizontal) {
    currentUv.y += stepLength * 0.5;
  } else {
    currentUv.x += stepLength * 0.5;
  }

  // Compute offset (for each iteration step) in the right direction.
  let offset = select(vec2f(0.0, texelSize.y), vec2f(texelSize.x, 0.0), isHorizontal);

  // Compute UVs to explore on each side of the edge, orthogonally. The QUALITY allows us to step faster.
  var uv1 = currentUv - offset; // * QUALITY(0); // (quality 0 is 1.0)
  var uv2 = currentUv + offset; // * QUALITY(0); // (quality 0 is 1.0)

  // Read the lumas at both current extremities of the exploration segment, and compute the delta wrt to the local average luma.
  var lumaEnd1 = readLumaTexture(lumaTexture, lumaTextureSampler, uv1);
  var lumaEnd2 = readLumaTexture(lumaTexture, lumaTextureSampler, uv2);
  lumaEnd1 -= lumaLocalAverage;
  lumaEnd2 -= lumaLocalAverage;

  // If the luma deltas at the current extremities is larger than the local gradient, we have reached the side of the edge.
  var reached1 = abs(lumaEnd1) >= gradientScaled;
  var reached2 = abs(lumaEnd2) >= gradientScaled;
  var reachedBoth = reached1 && reached2;

  // If the side is not reached, we continue to explore in this direction.
  if (!reached1) {
    uv1 -= offset; // * QUALITY(1); // (quality 1 is 1.0)
  }
  if (!reached2) {
    uv2 += offset; // * QUALITY(1); // (quality 1 is 1.0)
  }

  // If both sides have not been reached, continue to explore.
  if (!reachedBoth) {
    for (var i = 2; i < FXAA_ITERATIONS; i++) {
      // If needed, read luma in 1st direction, compute delta.
      if (!reached1) {
        lumaEnd1 = readLumaTexture(lumaTexture, lumaTextureSampler, uv1);
        lumaEnd1 = lumaEnd1 - lumaLocalAverage;
      }
      // If needed, read luma in opposite direction, compute delta.
      if (!reached2) {
        lumaEnd2 = readLumaTexture(lumaTexture, lumaTextureSampler, uv2);
        lumaEnd2 = lumaEnd2 - lumaLocalAverage;
      }
      // If the luma deltas at the current extremities is larger than the local gradient, we have reached the side of the edge.
      reached1 = abs(lumaEnd1) >= gradientScaled;
      reached2 = abs(lumaEnd2) >= gradientScaled;
      reachedBoth = reached1 && reached2;

      // If the side is not reached, we continue to explore in this direction, with a variable quality.
      if (!reached1) {
        uv1 -= offset * FXAA_QUALITY(i);
      }
      if (!reached2) {
        uv2 += offset * FXAA_QUALITY(i);
      }

      // If both sides have been reached, stop the exploration.
      if (reachedBoth) {
        break;
      }
    }
  }

  // Compute the distances to each side edge of the edge (!).
  let distance1 = select(uv.y - uv1.y, uv.x - uv1.x, isHorizontal);
  let distance2 = select(uv2.y - uv.y, uv2.x - uv.x, isHorizontal);

  // In which direction is the side of the edge closer?
  let isDirection1 = distance1 < distance2;
  let distanceFinal = min(distance1, distance2);

  // Thickness of the edge.
  let edgeThickness = distance1 + distance2;

  // Is the luma at center smaller than the local average?
  let isLumaCenterSmaller = lumaCenter < lumaLocalAverage;

  // If the luma at center is smaller than at its neighbour, the delta luma at each end should be positive (same variation).
  // (in the direction of the closer side of the edge.)
  let closestLumaEnd = select(lumaEnd2, lumaEnd1, isDirection1);
  let correctVariation = (closestLumaEnd < 0.0) != isLumaCenterSmaller;

  // UV offset: read in the direction of the closest side of the edge.
  let pixelOffset = -distanceFinal / edgeThickness + 0.5;

  // If the luma variation is incorrect, do not offset.
  var finalOffset = select(0.0, pixelOffset, correctVariation);

  // Sub-pixel shifting
  // Full weighted average of the luma over the 3x3 neighborhood.
  let lumaAverage = FXAA_ONE_OVER_TWELVE * (2.0 * (lumaDownUp + lumaLeftRight) + lumaLeftCorners + lumaRightCorners);
  // Ratio of the delta between the global average and the center luma, over the luma range in the 3x3 neighborhood.
  let subPixelOffset1 = clamp(abs(lumaAverage - lumaCenter) / lumaRange, 0.0, 1.0);
  let subPixelOffset2 = smoothstep(0.0, 1.0, subPixelOffset1);
  // Compute a sub-pixel offset based on this delta.
  let subPixelOffsetFinal = subPixelOffset2 * subPixelOffset2 * subPixelQuality;

  // Pick the biggest of the two offsets.
  finalOffset = max(finalOffset, subPixelOffsetFinal);

  // Compute the final UV coordinates.
  var finalUv = uv;
  if (isHorizontal) {
    finalUv.y += finalOffset * stepLength;
  } else {
    finalUv.x += finalOffset * stepLength;
  }

  return finalUv;
}
`;

/**
* Film Grain
*
* Reference Implementations:
*
* - https://devlog-martinsh.blogspot.com/2013/05/image-imperfections-and-film-grain-post.html
* - https://www.shadertoy.com/view/4sSXDW
*
* @type {string}
* @alias module:shaders.filmGrain
*/
var film_grain_default = `
const FILM_GRAIN_TIME_OFFSET = vec3f(0.07, 0.11, 0.13);
const FILM_GRAIN_CHANNEL_OFFSET = vec2f(1.1, 1.2);

// FILM_GRAIN_QUALITY is expected to be declared as \`override\` i32 by the
// composing pipeline shader (0 = Random, 1 = Large Film Grain Lottes,
// 2 = Upitis with periodic simplex noise).

// Random
fn filmGrainRandom(uv: vec2f, time: f32) -> f32 {
  return rand(uv * (1.0 + fract(time))) * 2.0 - 1.0;
}
fn filmGrainRandomColor(uv: vec2f, time: f32, size: f32, colorIntensity: f32) -> vec3f {
  let n = filmGrainRandom(uv * size, time * FILM_GRAIN_TIME_OFFSET.x);

  return vec3f(
    n,
    mix(n, filmGrainRandom(uv * FILM_GRAIN_CHANNEL_OFFSET.x * size, time * FILM_GRAIN_TIME_OFFSET.y), colorIntensity),
    mix(n, filmGrainRandom(uv * FILM_GRAIN_CHANNEL_OFFSET.y * size, time * FILM_GRAIN_TIME_OFFSET.z), colorIntensity)
  );
}

// Large Film Grain Lottes
fn filmGrainLargeStep1(uv: vec2f, n: f32) -> f32 {
  let b = 2.0;
  let c = -12.0;

  return (1.0 / (4.0 + b * 4.0 + abs(c))) * (
    rand((uv + vec2f(-1.0, -1.0)) + n) +
    rand((uv + vec2f(0.0, -1.0)) + n) * b +
    rand((uv + vec2f(1.0, -1.0)) + n) +
    rand((uv + vec2f(-1.0, 0.0)) + n) * b +
    rand((uv + vec2f(0.0, 0.0)) + n) * c +
    rand((uv + vec2f(1.0, 0.0)) + n) * b +
    rand((uv + vec2f(-1.0, 1.0)) + n) +
    rand((uv + vec2f(0.0, 1.0)) + n) * b +
    rand((uv + vec2f(1.0, 1.0)) + n)
  );
}
fn filmGrainLargeStep2(uv: vec2f, n: f32) -> f32 {
  let b = 2.0;
  let c = 4.0;

  return (1.0 / (4.0 + b * 4.0 + c)) * (
    filmGrainLargeStep1(uv + vec2f(-1.0, -1.0), n) +
    filmGrainLargeStep1(uv + vec2f(0.0, -1.0), n) * b +
    filmGrainLargeStep1(uv + vec2f(1.0, -1.0), n) +
    filmGrainLargeStep1(uv + vec2f(-1.0, 0.0), n) * b +
    filmGrainLargeStep1(uv + vec2f(0.0, 0.0), n) * c +
    filmGrainLargeStep1(uv + vec2f(1.0, 0.0), n) * b +
    filmGrainLargeStep1(uv + vec2f(-1.0, 1.0), n) +
    filmGrainLargeStep1(uv + vec2f(0.0, 1.0), n) * b +
    filmGrainLargeStep1(uv + vec2f(1.0, 1.0), n)
  );
}
fn filmGrainLarge(uv: vec2f, time: f32, size: f32, colorIntensity: f32) -> vec3f {
  let scale = 18.0; // Match filmGrainRandom
  let n = filmGrainLargeStep2(uv * size, FILM_GRAIN_TIME_OFFSET.x * time);

  return scale * vec3f(
    n,
    mix(n, filmGrainLargeStep2(uv * FILM_GRAIN_CHANNEL_OFFSET.x * size, FILM_GRAIN_TIME_OFFSET.y * time), colorIntensity),
    mix(n, filmGrainLargeStep2(uv * FILM_GRAIN_CHANNEL_OFFSET.y * size, FILM_GRAIN_TIME_OFFSET.z * time), colorIntensity)
  );
}

// Upitis with periodic simplex noise
const FILM_GRAIN_ROTATION_OFFSET = vec3f(1.425, 3.892, 5.835);

fn filmGrainRotate(uv: vec2f, angle: f32, aspect: f32) -> vec2f {
  let cosAngle = cos(angle);
  let sinAngle = sin(angle);
  let p = uv * 2.0 - 1.0;
  return vec2f(
    (cosAngle * aspect * p.x - sinAngle * p.y) / aspect,
    cosAngle * p.y + sinAngle * aspect * p.x
  ) * 0.5 + 0.5;
}

fn filmGrainUpitis(uv: vec2f, angle: f32, offset: vec2f, aspect: f32, z: f32, rep: vec3f) -> f32 {
  return pnoiseVec3(vec3f(offset * filmGrainRotate(uv, angle, aspect), z), rep);
}
fn filmGrainUpitisColor(uv: vec2f, time: f32, size: f32, colorIntensity: f32, viewportSize: vec2f) -> vec3f {
  let offset = viewportSize / vec2f(size);
  let aspect = viewportSize.x / viewportSize.y;

  let rep = vec3f(uv + vec2f(time), 1.0);
  let n = filmGrainUpitis(uv, time + FILM_GRAIN_ROTATION_OFFSET.x, offset, aspect, 0.0, rep);

  return vec3f(
    n,
    mix(n, filmGrainUpitis(uv, time + FILM_GRAIN_ROTATION_OFFSET.y, offset, aspect, 1.0, rep), colorIntensity),
    mix(n, filmGrainUpitis(uv, time + FILM_GRAIN_ROTATION_OFFSET.z, offset, aspect, 2.0, rep), colorIntensity)
  );
}

fn filmGrain(
  color: vec3f,
  luma: f32,
  uv: vec2f,
  viewportSize: vec2f,
  size: f32,
  intensity: f32,
  colorIntensity: f32,
  luminanceIntensity: f32,
  time: f32
) -> vec3f {
  var noise: vec3f;
  if (FILM_GRAIN_QUALITY == 0) {
    noise = filmGrainRandomColor(uv, time, size, colorIntensity);
  } else if (FILM_GRAIN_QUALITY == 1) {
    noise = filmGrainLarge(uv, time, size, colorIntensity);
  } else {
    noise = filmGrainUpitisColor(uv, time, size, colorIntensity, viewportSize);
  }

  let luminance = mix(0.0, luma, luminanceIntensity);
  return saturateVec3(color + mix(noise, vec3f(0.0), pow(luminance + smoothstep(0.2, 0.0, luminance), 4.0)) * intensity);
}
`;

const READ_LUMA_TEXTURE = `
fn readLumaTexture(tex: texture_2d<f32>, texSampler: sampler, uv: vec2f) -> f32 {
  return textureSampleLevel(tex, texSampler, uv, 0.0).r;
}
`;
/** Precomputes luma into a single channel for the FXAA and film grain passes. */
const lumaShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}

${fullscreenVertex()}

// Fragment includes
${luma_default}
${encode_decode_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(uTexture, uTextureSampler, input.texCoord0);

  return vec4f(luma(encode(color, SRGB).rgb), 0.0, 0.0, 1.0);
}
`);
};
/** Anti-aliasing, grain and output opacity. */
const finalShader = (defines = /* @__PURE__ */ new Set()) => {
	const useFXAA = defines.has("USE_FXAA");
	const useFilmGrain = defines.has("USE_FILM_GRAIN");
	const useLumaTexture = useFXAA || useFilmGrain;
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

struct Final {
  subPixelQuality: f32,
  filmGrainSize: f32,
  filmGrainIntensity: f32,
  filmGrainColorIntensity: f32,
  filmGrainLuminanceIntensity: f32,
  filmGrainSpeed: f32,
  opacity: f32,
}
@group(0) @binding(${alloc.next()}) var<uniform> uFinal: Final;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${useLumaTexture ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uLumaTexture") : ""}

${fullscreenVertex({
		corners: useFXAA,
		axis: useFXAA
	})}

// Fragment includes
${saturate}
${encode_decode_default}
${useLumaTexture ? READ_LUMA_TEXTURE : ""}
${useFXAA ? fxaa_default : ""}
${useFilmGrain ? `// 0 random, 1 large (Lottes), 2 Upitis periodic simplex noise.
override FILM_GRAIN_QUALITY: i32 = 2;
${glslMod}
${common}
${perlin}
${random}
${film_grain_default}` : ""}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  ${useFXAA ? `let uv = fxaa(
    uLumaTexture,
    uLumaTextureSampler,
    input.texCoord0,
    input.texCoord0LeftUp,
    input.texCoord0RightUp,
    input.texCoord0LeftDown,
    input.texCoord0RightDown,
    input.texCoord0Down,
    input.texCoord0Up,
    input.texCoord0Left,
    input.texCoord0Right,
    uPostProcessing.texelSize,
    uFinal.subPixelQuality
  );` : "let uv = input.texCoord0;"}

  var colorSRGB = encode(textureSample(uTexture, uTextureSampler, uv), SRGB);

  ${useFilmGrain ? `colorSRGB = vec4f(
    filmGrain(
      colorSRGB.rgb,
      readLumaTexture(uLumaTexture, uLumaTextureSampler, input.texCoord0),
      uv,
      uPostProcessing.viewportSize,
      uFinal.filmGrainSize,
      uFinal.filmGrainIntensity,
      uFinal.filmGrainColorIntensity,
      uFinal.filmGrainLuminanceIntensity,
      floor(uPostProcessing.time * uFinal.filmGrainSpeed * 60.0)
    ),
    colorSRGB.a
  );` : ""}

  let color = decode(colorSRGB, SRGB);

  return vec4f(color.rgb, color.a * uFinal.opacity);
}
`);
};

export { lumaShader as n, finalShader as t };