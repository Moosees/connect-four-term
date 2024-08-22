type GameOptions = {
  width?: number;
  height?: number;
  // names and AI player enabled etc.
};

export class Game {
  #numCols: number;
  #numRows: number;

  constructor(options: GameOptions) {
    this.#numCols = options.width || 7;
    this.#numRows = options.height || 6;
  }

  run() {
    this.#setupGame();
    this.#mockGameplay();
  }

  #setupGame() {
    // create or reset board, update size or players if needed
  }

  #mockGameplay() {
    // do some test moves on the board
  }
}
