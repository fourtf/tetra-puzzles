import { GameStuff } from "@/game/GameStuff";
import { Piece } from "./Piece";

const colors = ["#000", "#f00", "#0f0", "#00f", "#f0f"];

export default function drawGame(
  canvas: HTMLCanvasElement,
  { map, piece, piecePosition }: GameStuff
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.resetTransform();
  ctx.translate(0, 50);
  ctx.scale(50, 50);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, -50, canvas.width, canvas.height);

  drawMap(ctx, map);
  drawPiece(ctx, piece, piecePosition, 1);
}

function drawMap(ctx: CanvasRenderingContext2D, map: number[][]) {
  map.forEach((line, y) => {
    line.forEach((block, x) => {
      drawBlock(ctx, x, y, block);
    });
  });
}

function drawPiece(
  ctx: CanvasRenderingContext2D,
  piece: Piece,
  pos: [number, number],
  blockIndex: number
) {
  piece.blocks.forEach((line, y) => {
    line.forEach((block, x) => {
      if (block) {
        drawBlock(ctx, x + pos[0], y + pos[1], blockIndex);
      }
    });
  });
}

function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  blockIndex: number
) {
  if (blockIndex !== 0) {
    ctx.fillStyle = colors[blockIndex];
    ctx.fillRect(x + 0.03, y + 0.03, 0.94, 0.94);
  }
}
