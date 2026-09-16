import * as THREE from "three";
import { PALETTE as P } from "./textures";

const W = 1600;
const H = 1080;

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function fill(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number, r: number) {
  rr(ctx, x, y, w, h, r);
  ctx.fillStyle = color;
  ctx.fill();
}

function text(
  ctx: CanvasRenderingContext2D,
  str: string,
  x: number,
  y: number,
  font: string,
  color: string,
  align: CanvasTextAlign = "left"
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(str, x, y);
}

const SERIF = "Fraunces, 'Times New Roman', Georgia, serif";
const SANS = "'DM Sans', Inter, system-ui, sans-serif";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  rr(ctx, 0, 0, W, H, 44);
  ctx.clip();

  // Page
  ctx.fillStyle = P.cream;
  ctx.fillRect(0, 0, W, H);

  // Browser chrome
  ctx.fillStyle = P.cream2;
  ctx.fillRect(0, 0, W, 92);
  ctx.fillStyle = "rgba(90,31,43,0.08)";
  ctx.fillRect(0, 92, W, 2);
  [P.pink, P.sand, P.burgundy].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(52 + i * 34, 46, 10, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  fill(ctx, "#efe6da", 200, 26, 1000, 40, 20);
  text(ctx, "yourbusiness.com", 700, 47, `500 22px ${SANS}`, P.brownMuted, "center");

  // Site nav
  ctx.beginPath();
  ctx.arc(96, 158, 10, 0, Math.PI * 2);
  ctx.fillStyle = P.burgundy;
  ctx.fill();
  text(ctx, "Your Business", 120, 160, `500 30px ${SERIF}`, P.burgundy);
  ["Services", "Gallery", "Reviews", "Contact"].forEach((s, i) => {
    text(ctx, s, 880 + i * 130, 160, `500 21px ${SANS}`, P.brown);
  });
  fill(ctx, P.burgundy, 1370, 130, 160, 56, 28);
  text(ctx, "Book Now", 1450, 159, `600 20px ${SANS}`, P.cream, "center");

  // Hero copy
  text(ctx, "A first impression", 92, 330, `500 88px ${SERIF}`, P.burgundyDeep);
  text(ctx, "worth booking.", 92, 428, `italic 300 88px ${SERIF}`, P.burgundy);
  text(ctx, "Modern, mobile-first and built to turn", 96, 520, `400 26px ${SANS}`, P.brownMuted);
  text(ctx, "visitors into customers.", 96, 558, `400 26px ${SANS}`, P.brownMuted);
  fill(ctx, P.burgundy, 92, 616, 290, 66, 33);
  text(ctx, "BOOK APPOINTMENT", 237, 650, `600 18px ${SANS}`, P.cream, "center");
  rr(ctx, 402, 616, 190, 66, 33);
  ctx.strokeStyle = P.burgundy;
  ctx.lineWidth = 2;
  ctx.stroke();
  text(ctx, "CALL NOW", 497, 650, `600 18px ${SANS}`, P.burgundy, "center");

  // Hero image block
  const g = ctx.createLinearGradient(880, 250, 1520, 700);
  g.addColorStop(0, P.sand);
  g.addColorStop(1, P.pinkLight);
  rr(ctx, 880, 250, 640, 450, 30);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1320, 400, 120, 0, Math.PI * 2);
  ctx.fillStyle = P.pink;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1040, 560, 62, 0, Math.PI * 2);
  ctx.fillStyle = P.cream;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1440, 600, 26, 0, Math.PI * 2);
  ctx.fillStyle = P.burgundy;
  ctx.fill();

  // Floating review badge
  ctx.save();
  ctx.shadowColor = "rgba(90,31,43,0.25)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 16;
  fill(ctx, P.cream2, 850, 640, 290, 84, 42);
  ctx.restore();
  text(ctx, "★★★★★", 890, 672, `400 26px ${SANS}`, P.pinkDeep);
  text(ctx, "Reviews on Google", 890, 700, `500 17px ${SANS}`, P.brownMuted);

  // Feature cards
  const cards = [
    ["Services", "Explore what we offer"],
    ["Gallery", "See the space and the work"],
    ["Visit us", "Directions, hours and contact"],
  ];
  cards.forEach(([t, d], i) => {
    const x = 92 + i * 476;
    fill(ctx, P.sandLight, x, 790, 436, 210, 26);
    ctx.beginPath();
    ctx.arc(x + 54, 850, 24, 0, Math.PI * 2);
    ctx.fillStyle = P.pink;
    ctx.fill();
    text(ctx, t, x + 98, 850, `500 30px ${SERIF}`, P.burgundy);
    text(ctx, d, x + 40, 918, `400 21px ${SANS}`, P.brownMuted);
    text(ctx, "Learn more →", x + 40, 960, `600 17px ${SANS}`, P.burgundy);
  });

  ctx.restore();
}

/** Procedurally paints a premium local-business website into a texture for the 3D browser window. */
export function createBrowserTexture(): { texture: THREE.CanvasTexture; dispose: () => void } {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  draw(ctx);

  let cancelled = false;
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (fonts?.load) {
    Promise.all([
      fonts.load(`500 88px ${SERIF}`),
      fonts.load(`italic 300 88px ${SERIF}`),
      fonts.load(`500 22px ${SANS}`),
      fonts.load(`600 18px ${SANS}`),
    ])
      .then(() => {
        if (cancelled) return;
        draw(ctx);
        texture.needsUpdate = true;
      })
      .catch(() => {});
  }

  return {
    texture,
    dispose: () => {
      cancelled = true;
      texture.dispose();
    },
  };
}
