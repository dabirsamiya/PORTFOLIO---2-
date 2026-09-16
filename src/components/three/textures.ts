import * as THREE from "three";

export const PALETTE = {
  cream: "#f7f1e8",
  cream2: "#fcf9f4",
  sand: "#dccbb8",
  sandLight: "#ede3d6",
  sandDeep: "#c6b097",
  pink: "#cfa6a3",
  pinkLight: "#e7d1ce",
  pinkDeep: "#b3847f",
  burgundy: "#5a1f2b",
  burgundyDeep: "#3e1520",
  brown: "#3b2a25",
  brownMuted: "#7a6761",
};

let shadowTex: THREE.CanvasTexture | null = null;

/** Soft elliptical shadow blob for grounding floating objects. */
export function getShadowTexture(): THREE.CanvasTexture {
  if (shadowTex) return shadowTex;
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(90,31,43,0.55)");
  g.addColorStop(0.35, "rgba(90,31,43,0.22)");
  g.addColorStop(0.7, "rgba(90,31,43,0.05)");
  g.addColorStop(1, "rgba(90,31,43,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  shadowTex = new THREE.CanvasTexture(c);
  shadowTex.colorSpace = THREE.SRGBColorSpace;
  return shadowTex;
}
