import { getPieceByName, Piece } from "./Piece";

export type NextPieceFunc = () => Piece | undefined;

export function staticNextPieces(pieces: Piece[]): NextPieceFunc {
  return () => {
    if (pieces.length === 0) {
      return undefined;
    } else {
      const val = pieces[0];
      pieces = pieces.slice(1);
      return val;
    }
  };
}

export function staticNextPiecesByName(names: string[]): NextPieceFunc {
  return staticNextPieces(
    names
      .map(name => getPieceByName(name))
      .filter(x => x !== undefined) as Piece[]
  );
}
