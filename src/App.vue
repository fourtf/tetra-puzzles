<template>
  Tetris Puzzle Game (don't sue please)

  <Game />
  <div v-if="isLevelSelected">Select a level below</div>
  <LevelSelect />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Game from "@/components/Game.vue";
import LevelSelect from "@/components/LevelSelect.vue";
import game from "@/store/Game";

export default defineComponent({
  name: "App",
  components: {
    Game,
    LevelSelect,
  },
  setup() {
    return {
      isLevelSelected: computed(() => game.currentLevel.value.map.length === 0),
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
