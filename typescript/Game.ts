import Board from "./Board.js";

type GameOptions = {
  width?: number;
  height?: number;
  // names and AI player enabled etc.
};

export default class Game {
  #numCols: number;
  #numRows: number;
  #board: Board | undefined;

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
    this.#board = new Board(this.#numCols, this.#numRows);
  }

  #mockGameplay() {
    // do some test moves on the board
    if (!this.#board) throw new Error("Cannot find instance of board");

    this.#board.dropToken(0, 1);
    this.#board.dropToken(2, 1);
    this.#board.dropToken(2, 1);
    this.#board.dropToken(3, 1);
    this.#board.dropToken(1, 1);
    this.#board.dropToken(2, 1);
  }
}
