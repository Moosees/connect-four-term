import {
  BoardMatrix,
  ComputerOpponent,
  OpponentInitializer,
  PlayerOptions,
} from "../types.js";

export default class Player {
  isHuman;
  name;
  opponentId;
  opponent: ComputerOpponent | null;

  constructor(options: PlayerOptions) {
    this.isHuman = options.isHuman;
    this.name = options.name;
    this.opponentId = options.opponentId;
    this.opponent = null;
    // NOTE: for some reason calling updatePlayer in constructor breaks implied types
  }

  updatePlayer(options: PlayerOptions) {
    this.isHuman = options.isHuman;
    this.name = options.name;
    this.opponentId = options.opponentId;
  }

  initializeOpponent(
    opponents: OpponentInitializer[],
    boardMatrix: BoardMatrix,
  ) {
    if (this.isHuman) {
      this.opponent = null;
      return;
    }

    const opponentInitializer = opponents.find(
      (opponent) => opponent.id === this.opponentId,
    );
    if (!opponentInitializer) throw new Error("Could not find oppoenent");
    this.opponent = new opponentInitializer.constructor(boardMatrix);
  }
}
