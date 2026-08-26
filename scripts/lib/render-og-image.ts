import fs from "fs";
import path from "path";
import Canvas from "canvas";

const { createCanvas, registerFont } = Canvas;

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const MARGIN_X = 90;
const TEXT_MAX_WIDTH = 700;

const COLORS = {
  gradientFrom: "#0d1f38",
  gradientTo: "#264a72",
  name: "#ffffff",
  title: "#dce7f3",
  subtitle: "#7fb3dd",
  circuit: "rgba(255, 255, 255, 0.16)",
  circuitPad: "rgba(255, 255, 255, 0.28)",
};

export type OgImageContent = {
  name: string;
  title: string;
  subtitle: string;
};

type TextStyle = {
  weight: "bold" | "normal";
  maxSize: number;
  minSize: number;
  lineHeight: number;
  color: string;
  maxLines: number;
};

const STYLES: Record<keyof OgImageContent, TextStyle> = {
  name: { weight: "bold", maxSize: 86, minSize: 56, lineHeight: 1.1, color: COLORS.name, maxLines: 1 },
  title: { weight: "normal", maxSize: 58, minSize: 36, lineHeight: 1.15, color: COLORS.title, maxLines: 2 },
  subtitle: { weight: "normal", maxSize: 34, minSize: 24, lineHeight: 1.25, color: COLORS.subtitle, maxLines: 2 },
};

let fontsRegistered = false;

function registerFonts(): void {
  if (fontsRegistered) return;

  const fontsDir = path.join(process.cwd(), "public", "fonts");
  registerFont(path.join(fontsDir, "Lato-Regular.ttf"), { family: "Lato", weight: "normal" });
  registerFont(path.join(fontsDir, "Lato-Bold.ttf"), { family: "Lato", weight: "bold" });
  fontsRegistered = true;
}

type Ctx = Canvas.CanvasRenderingContext2D;

function wrap(ctx: Ctx, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";

  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

/**
 * Picks the largest font size at which `text` fits within `maxWidth` using at
 * most `style.maxLines` lines, so longer names/titles shrink instead of
 * overflowing the card.
 */
function layoutText(ctx: Ctx, text: string, style: TextStyle): { size: number; lines: string[] } {
  for (let size = style.maxSize; size > style.minSize; size -= 2) {
    ctx.font = `${style.weight} ${size}px Lato`;
    const lines = wrap(ctx, text, TEXT_MAX_WIDTH);
    if (lines.length <= style.maxLines) return { size, lines };
  }

  ctx.font = `${style.weight} ${style.minSize}px Lato`;
  return { size: style.minSize, lines: wrap(ctx, text, TEXT_MAX_WIDTH).slice(0, style.maxLines) };
}

function drawBackground(ctx: Ctx): void {
  const gradient = ctx.createLinearGradient(0, 0, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);
  gradient.addColorStop(0, COLORS.gradientFrom);
  gradient.addColorStop(1, COLORS.gradientTo);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);

  // Diagonal sheen across the upper-left half.
  const sheen = ctx.createLinearGradient(0, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, 0);
  sheen.addColorStop(0, "rgba(255, 255, 255, 0)");
  sheen.addColorStop(0.55, "rgba(255, 255, 255, 0.05)");
  sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);
}

function trace(ctx: Ctx, points: [number, number][]): void {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
  ctx.stroke();
}

function pad(ctx: Ctx, x: number, y: number, radius = 7): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function hexagon(ctx: Ctx, cx: number, cy: number, radius: number): void {
  ctx.beginPath();
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

/** Decorative PCB-style artwork on the right third of the card. */
function drawCircuitry(ctx: Ctx): void {
  ctx.save();
  ctx.strokeStyle = COLORS.circuit;
  ctx.fillStyle = COLORS.circuitPad;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const traces: [number, number][][] = [
    [[1200, 90], [1080, 90], [1030, 140], [880, 140]],
    [[1200, 175], [1120, 175], [1070, 225], [960, 225], [930, 255]],
    [[840, 300], [905, 300], [950, 345], [1090, 345], [1130, 305], [1200, 305]],
    [[1200, 400], [1105, 400], [1060, 445], [905, 445]],
    [[1200, 500], [1150, 500], [1100, 550], [980, 550], [940, 510], [860, 510]],
    [[1010, 60], [1010, 130], [1055, 175], [1055, 260]],
    [[1145, 260], [1145, 360]],
    [[895, 200], [895, 265], [935, 305]],
    [[1090, 455], [1090, 570], [1050, 610]],
  ];
  traces.forEach((points) => trace(ctx, points));

  hexagon(ctx, 1015, 200, 42);
  hexagon(ctx, 960, 490, 55);
  hexagon(ctx, 1160, 430, 34);

  const pads: [number, number][] = [
    [880, 140], [930, 255], [840, 300], [905, 445], [860, 510],
    [1010, 60], [1055, 260], [1145, 360], [895, 200], [1050, 610],
  ];
  pads.forEach(([x, y]) => pad(ctx, x, y));

  // Chip-pin blocks in the top-right corner.
  ctx.fillStyle = COLORS.circuit;
  for (let i = 0; i < 3; i += 1) {
    ctx.fillRect(1130, 120 + i * 22, 46, 10);
  }
  for (let i = 0; i < 4; i += 1) {
    ctx.fillRect(1105, 235 + i * 18, 22, 8);
  }

  ctx.restore();
}

function drawText(ctx: Ctx, content: OgImageContent): void {
  const blocks = (Object.keys(STYLES) as (keyof OgImageContent)[]).map((key) => ({
    style: STYLES[key],
    ...layoutText(ctx, content[key], STYLES[key]),
  }));

  const gaps = [22, 26];
  const blockHeights = blocks.map((b) => b.lines.length * b.size * b.style.lineHeight);
  const totalHeight = blockHeights.reduce((sum, h) => sum + h, 0) + gaps.reduce((sum, g) => sum + g, 0);

  ctx.textBaseline = "top";
  let y = (OG_IMAGE_HEIGHT - totalHeight) / 2;

  blocks.forEach((block, index) => {
    ctx.font = `${block.style.weight} ${block.size}px Lato`;
    ctx.fillStyle = block.style.color;
    for (const line of block.lines) {
      ctx.fillText(line, MARGIN_X, y);
      y += block.size * block.style.lineHeight;
    }
    y += gaps[index] ?? 0;
  });
}

export function renderOgImage(content: OgImageContent, outputPath: string): void {
  registerFonts();

  const canvas = createCanvas(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);
  const ctx = canvas.getContext("2d");

  drawBackground(ctx);
  drawCircuitry(ctx);
  drawText(ctx, content);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));
}
