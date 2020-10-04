import { PieceType } from "./Piece";

export type KicktableFunc = (
  pieceId: PieceType,
  rotation: number,
  direction: RotationDirection
) => [number, number][];

export enum RotationDirection {
  Left,
  Right,
  _180,
}

// prettier-ignore
const srsRotL: { [key: number]: [number, number][] } = {
    /*R -> 0*/ 0: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
    /*2 -> R*/ 1: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
    /*L -> 2*/ 2: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
    /*0 -> L*/ 3: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
};

// prettier-ignore
const srsRotR: { [key: number]: [number, number][] } = {
    /*0 -> R*/ 1: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
    /*R -> 2*/ 2: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
    /*2 -> L*/ 3: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
    /*L -> 0*/ 0: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
}

// prettier-ignore
const srsRotLineL : { [key: number]: [number, number][] } = {
    /*R -> 0*/ 0: [[ 0, 0], [+2, 0], [-1, 0], [+2,+1], [-1,-2]],
    /*2 -> R*/ 1: [[ 0, 0], [+1, 0], [-2, 0], [+1,-2], [-2,+1]],
    /*L -> 2*/ 2: [[ 0, 0], [-2, 0], [+1, 0], [-2,-1], [+1,+2]],
    /*0 -> L*/ 3: [[ 0, 0], [-1, 0], [+2, 0], [-1,+2], [+2,-1]],
}

// prettier-ignore
const srsRotLineR : { [key: number]: [number, number][] } = {
    /*0 -> R*/ 1: [[ 0, 0], [-2, 0], [+1, 0], [-2,-1], [+1,+2]],
    /*R -> 2*/ 2: [[ 0, 0], [-1, 0], [+2, 0], [-1,+2], [+2,-1]],
    /*2 -> L*/ 3: [[ 0, 0], [+2, 0], [-1, 0], [+2,+1], [-1,-2]],
    /*L -> 0*/ 0: [[ 0, 0], [+1, 0], [-2, 0], [+1,-2], [-2,+1]],
}

// https://tetris.wiki/Super_Rotation_System
export const srs: KicktableFunc = (rotation, pieceId, direction) => {
  if (pieceId === PieceType.O) return [[0, 0]];
  if (pieceId === PieceType.I) {
    switch (direction) {
      case RotationDirection.Left:
        return srsRotLineL[rotation];

      case RotationDirection.Right:
        return srsRotLineR[rotation];

      case RotationDirection._180:
        return [[0, 0]]; // todo
    }
  } else {
    switch (direction) {
      case RotationDirection.Left:
        return srsRotL[rotation];

      case RotationDirection.Right:
        return srsRotR[rotation];

      case RotationDirection._180:
        return [[0, 0]];
    }
  }
};
