export type Piece = {
  blocks: boolean[][];
};

export const linePiece: Piece = {
  blocks: [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
  ],
};

export const oPiece: Piece = {
  blocks: [
    [true, true],
    [true, true],
  ],
};

export const lPiece: Piece = {
  blocks: [
    [false, false, true],
    [true, true, true],
    [false, false, false],
  ],
};

export const jPiece: Piece = {
  blocks: [
    [true, false, false],
    [true, true, true],
    [false, false, false],
  ],
};

export const sPiece: Piece = {
  blocks: [
    [false, true, true],
    [true, true, false],
    [false, false, false],
  ],
};

export const zPiece: Piece = {
  blocks: [
    [true, true, false],
    [false, true, true],
    [false, false, false],
  ],
};

export const tPiece: Piece = {
  blocks: [
    [false, true, false],
    [true, true, true],
    [false, false, false],
  ],
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

export const nopPiece: Piece = { blocks: [] };

export function rotatePieceRight(piece: Piece): Piece {
  return {
    blocks: piece.blocks[0].map((_, index) =>
      piece.blocks.map(row => row[index]).reverse()
    ),
  };
}

export function rotatePieceLeft(piece: Piece): Piece {
  return rotatePieceRight(rotatePieceRight(rotatePieceRight(piece)));
}

export function rotatePiece180(piece: Piece): Piece {
  return rotatePieceRight(rotatePieceRight(piece));
}
