import {
  linePiece,
  Piece,
  rotatePiece180,
  rotatePieceLeft,
  rotatePieceRight,
  tPiece,
} from "@/game/Piece";

export type GameStuff = {
  map: number[][];
  piecePosition: [number, number];
  piece: Piece;
  nextPiece: () => Piece;
  finishAtBottom: boolean;
};

export function newGame(): GameStuff {
  return {
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 0, 3],
      [3, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 3],
      [3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3],
    ],
    piece: tPiece,
    piecePosition: newPiecePosition(),
    nextPiece: () => linePiece,
    finishAtBottom: true,
  };
}

function newPiecePosition(): [number, number] {
  return [4, -1];
}

export function movePieceLeft(stuff: GameStuff) {
  tryMovePiece(stuff, -1, 0);
}

export function movePieceRight(stuff: GameStuff) {
  tryMovePiece(stuff, 1, 0);
}

export function dropPiece(stuff: GameStuff) {
  while (tryMovePiece(stuff, 0, 1));
}

export function hardDrop(stuff: GameStuff) {
  dropPiece(stuff);

  const { map, piecePosition } = stuff;
  copyOver(map, stuff.piece, piecePosition, 1);
  stuff.piece = stuff.nextPiece();
  stuff.piecePosition = newPiecePosition();
}

export function advanceGame(stuff: GameStuff) {
  if (!tryMovePiece(stuff, 0, 1)) {
    // const { map, piecePosition } = stuff;

    // copyOver(map, stuff.piece, piecePosition, 1);
    // stuff.piece = stuff.nextPiece();
    // stuff.piecePosition = newPiecePosition();

    return true;
  }
}

export function rotateRight(stuff: GameStuff) {
  rotate(stuff, rotatePieceRight);
}

export function rotateLeft(stuff: GameStuff) {
  rotate(stuff, rotatePieceLeft);
}

export function rotate180(stuff: GameStuff) {
  rotate(stuff, rotatePiece180);
}

function rotate(stuff: GameStuff, rotateFunc: (p: Piece) => Piece) {
  const newPiece = rotateFunc(stuff.piece);

  // simple rotation
  if (!intersects(stuff.map, newPiece, stuff.piecePosition)) {
    stuff.piece = newPiece;
    return
  }

  // rotate + move up 1
  const p: [number, number] = [stuff.piecePosition[0], stuff.piecePosition[1] - 1]
  if (!intersects(stuff.map, newPiece, p)) {
    stuff.piece = newPiece;
    stuff.piecePosition = p;
    return
  }
}

// return true if success, false if failure
function tryMovePiece(stuff: GameStuff, dx: number, dy: number): boolean {
  const { map, piecePosition } = stuff;

  // check if piece can move down
  const newPiecePos: [number, number] = [
    piecePosition[0] + dx,
    piecePosition[1] + dy,
  ];

  if (!intersects(map, stuff.piece, newPiecePos)) {
    stuff.piecePosition = newPiecePos;
    return true;
  }
  return false;
}

function intersects(
  map: number[][],
  piece: Piece,
  [px, py]: [number, number]
): boolean {
  const { blocks } = piece;

  if (
    py >= map.length - 1 || // bottom
    px < 0 || // left
    px > (map[0]?.length ?? 0) - (piece.blocks[0]?.length ?? 0) // right
  ) {
    return true;
  }

  return blocks.some((line, y) =>
    line.some((isBlock, x) => isBlock && (map[y + py]?.[x + px] ?? 0) !== 0)
  );
}

function copyOver(
  map: number[][],
  piece: Piece,
  [px, py]: [number, number],
  blockIndex: number
) {
  const { blocks } = piece;

  blocks.forEach((line, y) =>
    line.forEach((isBlock, x) => {
      if (!isBlock) return;

      const mapLine = map[y + py];
      if (mapLine) {
        mapLine[x + px] = blockIndex;
      }
    })
  );
}
