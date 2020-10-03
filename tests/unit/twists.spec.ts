import { sPiece, tPiece } from "@/game/Piece";
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

  // Drop T-piece and then rotate it on the ground.
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
      )
  });

  it("s left", () => {
    new TwistTester(
      `-----
       -----
       xx--x
       x--xx
       xxxxx`
    )
      .spawn(sPiece, 1)
      .rotateLeft()
      .rotateLeft()
      .hardDrop()
      .mustEqual(
        `-----
         -----
         xxxxx
         xxxxx
         xxxxx`
      )
  });
});
