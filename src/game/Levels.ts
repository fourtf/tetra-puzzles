export interface LevelDefinition {
  //   url: string;
  load: () => Promise<Level>;
}

export interface Level {
  map: number[][];
  pieces: string[];
}

export const defaultLevel: Level = {
  map: [],
  pieces: [],
};

export const allLevelDefs: LevelDefinition[] = [
  {
    load: () => import("@/levels/t-spin-triple.json"),
  },
];
