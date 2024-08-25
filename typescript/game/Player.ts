import { PlayerOptions } from "../types.js";

export default class Player {
  isHuman;
  name;
  difficulty;

  constructor(options: PlayerOptions) {
    this.isHuman = options.isHuman;
    this.name = options.name;
    this.difficulty = options.difficulty;
  }
}
