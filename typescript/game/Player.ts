import { PlayerOptions } from "../types.js";

export default class Player {
  isHuman;
  name;
  difficulty;

  constructor(options: PlayerOptions) {
    this.isHuman = options.isHuman;
    this.name = options.name;
    this.difficulty = options.difficulty;
    // NOTE: for some reason calling updatePlayer in constructor breaks implied types
  }

  updatePlayer(options: PlayerOptions) {
    this.isHuman = options.isHuman;
    this.name = options.name;
    this.difficulty = options.difficulty;
  }
}
