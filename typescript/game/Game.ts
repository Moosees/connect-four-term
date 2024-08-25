// @ts-ignore
import { setTimeout } from "timers/promises";

import { UserInterface } from "../types.js";
import Board from "./Board.js";
import Player from "./Player.js";

type GameOptions = {
  width?: number;
  height?: number;
};

export default class Game {
  #numCols;
  #numRows;
  #board: Board | undefined;
  #userInterface;
  #playerOne;
  #playerTwo;

  constructor(userInterface: UserInterface, options: GameOptions) {
    this.#userInterface = userInterface;
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

  async run() {
    while (true) {
      const startChoice = await this.#userInterface.paintStart();
      if (startChoice === "quit") return;
      if (startChoice === "start") await this.#startGame();
      else if (startChoice === "options") await this.#configure();
      else this.#mockGameplay();
    }
  }

  async #configure() {
    const { p1, p2 } = await this.#userInterface.paintOptions({
      p1: this.#playerOne,
      p2: this.#playerTwo,
    });

    this.#playerOne = p1;
    this.#playerTwo = p2;
    console.log(this.#playerOne, this.#playerTwo);
  }

  async #startGame() {
    this.#board = new Board(this.#numCols, this.#numRows);

    let currentConnection = 0;
    let currentPlayer: 1 | 2 = 1;

    while (currentConnection < 4) {
      const playerName =
        currentPlayer === 1 ? this.#playerOne.name : this.#playerTwo.name;

      const currentMove = await this.#userInterface.paintTokenDropper(
        playerName,
        this.#numCols,
      );
      const { maxConnection, board } = this.#board.dropToken(
        currentMove,
        currentPlayer,
      );

      this.#userInterface.paintBoard(board);

      currentConnection = maxConnection;
      if (maxConnection < 4) currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    console.log(`Player ${currentPlayer} probably won`);
  }

  async #mockGameplay() {
    await this.#configure();

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
      this.#userInterface.paintBoard(board);

      if (maxConnection === 4) {
        console.log(`Player ${playerNum} WINS!`);
        break;
      }

      await setTimeout(500);
      playerNum = playerNum === 1 ? 2 : 1;
    }
  }
}
