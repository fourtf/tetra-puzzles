<template>
  <div class="hello">
    <canvas ref="canvas" class="game-canvas" :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, watch } from "vue";
import drawGame from "@/game/DrawGame";
import {
  advanceGame,
  dropPiece,
  hardDrop,
  movePieceLeft,
  movePieceRight,
  newGame,
  rotateLeft,
  rotateRight,
} from "@/game/GameStuff";
import game from "@/store/Game";
import clone from "@/util/Clone";
import { staticNextPiecesByName } from "@/game/NextPieces";
import { nopPiece } from "@/game/Piece";

export default defineComponent({
  name: "HelloWorld",

  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let gameStuff = newGame();
    gameStuff.piecePosition = [-10, -10];

    function resetLevel() {
      gameStuff = newGame();
      gameStuff.map = clone(game.currentLevel.value.map);
      gameStuff.nextPiece = staticNextPiecesByName(
        game.currentLevel.value.pieces
      );
      gameStuff.piece = gameStuff.nextPiece() ?? nopPiece;
    }

    watch(game.currentLevel, resetLevel);

    // draw
    {
      const handle = setInterval(
        () =>
          canvas.value &&
          drawGame(canvas.value as HTMLCanvasElement, gameStuff),
        1000 / 60
      );

      onUnmounted(() => clearInterval(handle));
    }

    // update
    {
      const handle = setInterval(() => {
        advanceGame(gameStuff);
      }, 500);

      onUnmounted(() => clearInterval(handle));
    }

    // keyboard
    const handler = (ev: KeyboardEvent) => {
      handleKey(ev.key);
    };
    window.addEventListener("keydown", handler);
    onUnmounted(() => window.removeEventListener("keydown", handler));

    function handleKey(key: string) {
      switch (key) {
        case "ArrowUp":
        case "x":
        case "X":
          rotateRight(gameStuff);
          break;
        case "ArrowDown":
          dropPiece(gameStuff);
          break;
        case "ArrowLeft":
          movePieceLeft(gameStuff);
          break;
        case "ArrowRight":
          movePieceRight(gameStuff);
          break;
        case " ":
          hardDrop(gameStuff);
          advanceGame(gameStuff);
          break;
        case "z":
        case "Z":
        case "y":
        case "Y":
          rotateLeft(gameStuff);
          break;
        case "r":
        case "R":
          resetLevel();
          break;
      }
    }

    return {
      canvas,
      width: 600,
      height: 450,
    };
  },
});
</script>

<style scoped>
.game-canvas {
  border: 1px solid #999;
}
</style>
