import { defaultLevel, Level, LevelDefinition } from "@/game/Levels";
import { ref } from "vue";

const state = {
  currentLevel: ref<Level>(defaultLevel),
};

function logSuccess(str: string) {
  console.info(
    `%c Store: ${str} `,
    "background: #111; color: #4b3; border: 1px #291;"
  );
}

export default {
  ...state,

  async loadLevel(def: LevelDefinition) {
    logSuccess("Loading level");

    // cancel old request
    state.currentLevel.value = await def.load();
  },
};
