export function makeCurlyBrace(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  w = 10,
  q = 0.55
) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  const len = Math.sqrt(dx * dx + dy * dy);
  dx = dx / len;
  dy = dy / len;

  const qx1 = x1 + q * w * dy;
  const qy1 = y1 - q * w * dx;
  const qx2 = x1 - 0.25 * len * dx + (1 - q) * w * dy;
  const qy2 = y1 - 0.25 * len * dy - (1 - q) * w * dx;
  const tx1 = x1 - 0.5 * len * dx + w * dy;
  const ty1 = y1 - 0.5 * len * dy - w * dx;
  const qx3 = x2 + q * w * dy;
  const qy3 = y2 - q * w * dx;
  const qx4 = x1 - 0.75 * len * dx + (1 - q) * w * dy;
  const qy4 = y1 - 0.75 * len * dy - (1 - q) * w * dx;

  return `M ${x1} ${y1}
     Q ${qx1} ${qy1} ${qx2} ${qy2}
     T ${tx1} ${ty1}
     M ${x2} ${y2}
     Q ${qx3} ${qy3} ${qx4} ${qy4}
     T ${tx1} ${ty1}`;
}
