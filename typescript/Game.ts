import Board from "./Board.js";
import Gui from "./Gui.js";
// @ts-ignore
import { setTimeout } from "timers/promises";

type GameOptions = {
  width?: number;
  height?: number;
  // names and AI player enabled etc.
};

export default class Game {
  #numCols;
  #numRows;
  #board: Board | undefined;
  #gui;

  constructor(options: GameOptions) {
    this.#gui = new Gui();
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

  async #mockGameplay() {
    // do some test moves on the board
    if (!this.#board) throw new Error("Cannot find instance of board");

    const mockMoves = [0, 2, 2, 3, 1];

    for (const move of mockMoves) {
      console.clear();
      this.#gui.paintBoard(this.#board.dropToken(move, 1));
      await setTimeout(500);
    }
  }
}
