export enum PieceType {
  S,
  Z,
  L,
  J,
  O,
  I,
  T,
  Other,
}

export type Piece = {
  blocks: boolean[][];
  rotation: number; // 0..3
  type: PieceType;
};

export const linePiece: Piece = {
  blocks: [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
  ],
  rotation: 0,
  type: PieceType.I,
};

export const oPiece: Piece = {
  blocks: [
    [true, true],
    [true, true],
  ],
  rotation: 0,
  type: PieceType.O,
};

export const lPiece: Piece = {
  blocks: [
    [false, false, true],
    [true, true, true],
    [false, false, false],
  ],
  rotation: 0,
  type: PieceType.L,
};

export const jPiece: Piece = {
  blocks: [
    [true, false, false],
    [true, true, true],
    [false, false, false],
  ],
  rotation: 0,
  type: PieceType.J,
};

export const sPiece: Piece = {
  blocks: [
    [false, true, true],
    [true, true, false],
    [false, false, false],
  ],
  rotation: 0,
  type: PieceType.S,
};

export const zPiece: Piece = {
  blocks: [
    [true, true, false],
    [false, true, true],
    [false, false, false],
  ],
  rotation: 0,
  type: PieceType.Z,
};

export const tPiece: Piece = {
  blocks: [
    [false, true, false],
    [true, true, true],
    [false, false, false],
  ],
  rotation: 0,
  type: PieceType.T,
};

export const allPieces = [
  linePiece,
  oPiece,
  lPiece,
  jPiece,
  sPiece,
  zPiece,
  tPiece,
];

export const nopPiece: Piece = {
  blocks: [],
  rotation: 0,
  type: PieceType.Other,
};

export function rotatePieceRight(piece: Piece): Piece {
  return {
    blocks: piece.blocks[0].map((_, index) =>
      piece.blocks.map(row => row[index]).reverse()
    ),
    rotation: (piece.rotation + 1) % 4,
    type: piece.type,
  };
}

export function rotatePieceLeft(piece: Piece): Piece {
  return rotatePieceRight(rotatePieceRight(rotatePieceRight(piece)));
}

export function rotatePiece180(piece: Piece): Piece {
  return rotatePieceRight(rotatePieceRight(piece));
}
