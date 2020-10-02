<template>
  <div class="hello">
    <canvas ref="canvas" class="game-canvas" width="600" height="400" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from "vue";
import drawGame from "@/game/DrawGame";
import {
  advanceGame,
  hardDrop,
  movePieceLeft,
  movePieceRight,
  newGame,
  rotateLeft,
  rotateRight,
} from "@/game/GameStuff";

export default defineComponent({
  name: "HelloWorld",

  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);

    const gameStuff = newGame();

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
          hardDrop(gameStuff);
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
      }
    }

    return {
      canvas,
    };
  },
});
</script>

<style scoped>
.game-canvas {
  width: 600px;
  height: 400px;
  border: 1px solid red;
}
</style>
