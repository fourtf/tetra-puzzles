<template>
  <div class="container">
    <div
      v-for="(levelDef, index) in levels"
      :key="index"
      class="level"
      @click="loadLevel(levelDef)"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { allLevelDefs } from "@/game/Levels";
import game from "@/store/Game";

export default defineComponent({
  setup() {
    return {
      levels: allLevelDefs,
      loadLevel: game.loadLevel,
    };
  },
});
</script>

<style scoped>
.level {
  width: 40px;
  height: 40px;
  border: 1px black solid;
  cursor: pointer;
  line-height: 40px;
}
</style>
