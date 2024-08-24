// @ts-ignore
import { setTimeout } from "timers/promises";

import Board from "./Board.js";
import Gui from "./Gui.js";
import Player from "./Player.js";

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
  #playerOne;
  #playerTwo;

  constructor(options: GameOptions) {
    this.#gui = new Gui();
    this.#numCols = options.width || 7;
    this.#numRows = options.height || 6;
    this.#playerOne = new Player({
      isHuman: true,
      name: "Player One",
      difficulty: 1,
    });
    this.#playerTwo = new Player({
      isHuman: true,
      name: "Player Two",
      difficulty: 1,
    });
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

    // const mockMoves = [3, 1, 3, 2, 3, 4, 3, 5]; // player 1 wins vertical with last move skipped
    // const mockMoves = [5, 0, 5, 1, 5, 2, 4, 3]; // player 2 wins horizontal
    // const mockMoves = [0, 1, 1, 2, 2, 4, 2, 4, 3, 3, 3, 5, 3]; // player 1 wins diag
    const mockMoves = [3, 3, 3, 3, 4, 6, 5, 5, 4, 4]; // player 2 wins diag
    let playerNum: 1 | 2 = 1;

    for (const move of mockMoves) {
      console.clear();
      const { maxConnection, board } = this.#board.dropToken(move, playerNum);
      this.#gui.paintBoard(board);

      if (maxConnection === 4) {
        console.log(`Player ${playerNum} WINS!`);
        break;
      }

      await setTimeout(500);
      playerNum = playerNum === 1 ? 2 : 1;
    }
  }
}
