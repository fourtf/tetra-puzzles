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

  /*
  it("triple t-spin", () => {
    new TwistTester(
      `-----
       ---x-
       ----x
       xxx-x
       xx--x
       xxx-x
       xxxxx`
    )
      .spawn(tPiece)
      .softDrop()
      .rotateRight()
      .hardDrop()
      .mustEqual(
        `-----
         ---x-
         ----x
         xxxxx
         xxxxx
         xxxxx
         xxxxx`
      )
  });
  */
});
