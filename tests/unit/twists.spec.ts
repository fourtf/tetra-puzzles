import { tPiece } from "@/game/Piece";
import { parseMap, TwistTester } from "./TwistTester";

describe("twists", () => {
  it("test test", () => {
    expect(
      parseMap(`---
                         -xx
                         x-x`)
    ).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
    ]);
  });

  it("t", () => {
    new TwistTester(
      `-----
       -----
       -----
       xxxxx`
    )
      .spawn(tPiece)
      .softDrop()
      .rotateRight()
      .hardDrop()
      .mustEqual(
        `-x---
         -xx--
         -x---
         xxxxx`
      );
  });
});
