var luma_default = `
fn luma(color: vec3f) -> f32 {
  return dot(color, vec3f(0.299, 0.587, 0.114));
}
`;

export { luma_default as t };