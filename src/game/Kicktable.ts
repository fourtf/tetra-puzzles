export type KicktableFunc = (
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
    /*0 -> L*/ 3: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
    /*L -> 2*/ 2: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
    /*2 -> R*/ 1: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
    /*R -> 0*/ 0: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
};

// prettier-ignore
const srsRotR: { [key: number]: [number, number][] } = {
    /*0 -> R*/ 1: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
    /*R -> 2*/ 2: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
    /*2 -> L*/ 3: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
    /*L -> 0*/ 0: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
}

// https://tetris.wiki/Super_Rotation_System
export const srs: KicktableFunc = (rotation, direction) => {
  switch (direction) {
    case RotationDirection.Left:
      return srsRotL[rotation];

    case RotationDirection.Right:
      return srsRotR[rotation];

    case RotationDirection._180:
      return [[0, 0]];
  }
};
