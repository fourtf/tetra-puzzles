import {
  advanceGame,
  GameStuff,
  dropPiece,
  newGame,
  rotate180,
  rotateLeft,
  rotateRight,
  hardDrop,
} from "@/game/GameStuff";
import { nopPiece, Piece } from "@/game/Piece";

export class TwistTester {
  game: GameStuff;

  constructor(map: string) {
    this.game = newGame();
    this.game.map = parseMap(map);
    this.game.nextPiece = () => nopPiece;
  }

  spawn(piece: Piece, x = 0, y = 0): TwistTester {
    this.game.piece = piece;
    this.game.piecePosition = [x, y];
    return this;
  }

  // advance(repeat = 1): TwistTester {
  //   for (let i = 0; i < repeat; i++) {
  //     advanceGame(this.game);
  //   }
  //   return this;
  // }

  rotateRight(): TwistTester {
    rotateRight(this.game);
    return this;
  }

  rotateLeft(): TwistTester {
    rotateLeft(this.game);
    return this;
  }

  rotate180(): TwistTester {
    rotate180(this.game);
    return this;
  }

  mustEqual(map: string): TwistTester {
    expect(encodeMap(this.game.map)).toEqual(encodeMap(parseMap(map)));
    return this;
  }

  softDrop(): TwistTester {
    dropPiece(this.game);
    return this;
  }

  hardDrop(): TwistTester {
    hardDrop(this.game);
    return this;
  }

  print(): TwistTester {
    console.log(encodeMap(this.game.map));
    return this;
  }
}

export function parseMap(map: string): number[][] {
  return map.split("\n").map(line => {
    const arr: number[] = [];
    for (const char of line) {
      switch (char) {
        case "-":
          arr.push(0);
          break;
        case "x":
          arr.push(1);
          break;
        case " ":
          break;
        default:
          throw Error(`unexpected char ${char}`);
      }
    }
    return arr;
  });
}

function encodeMap(map: number[][]): string {
  return map
    .map(line =>
      line
        .map(number => {
          switch (number) {
            case 0:
              return "-";
            default:
              return "x";
          }
        })
        .join()
    )
    .join("\n");
}
