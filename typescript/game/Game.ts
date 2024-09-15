import { OpponentInitializer, UserInterface } from "../types.js";
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
  #opponents;

  constructor(
    userInterface: UserInterface,
    opponents: OpponentInitializer[],
    options: GameOptions,
  ) {
    this.#userInterface = userInterface;
    this.#numCols = options.width || 7;
    this.#numRows = options.height || 6;
    this.#playerOne = new Player({
      isHuman: true,
      name: "Player One",
      opponentId: 1,
    });
    this.#playerTwo = new Player({
      isHuman: true,
      name: "Player Two",
      opponentId: 1,
    });
    this.#opponents = opponents;
  }

  async run() {
    while (true) {
      const startChoice = await this.#userInterface.paintStart();

      if (startChoice === "quit") return;
      if (startChoice === "start") {
        await this.#startGame();
        return;
      }
      if (startChoice === "options") await this.#configure();
    }
  }

  async #configure() {
    const { p1, p2 } = await this.#userInterface.paintOptions(
      {
        p1: this.#playerOne,
        p2: this.#playerTwo,
      },
      this.#opponents,
    );

    this.#playerOne.updatePlayer(p1);
    this.#playerTwo.updatePlayer(p2);
  }

  async #startGame() {
    this.#board = new Board(this.#numCols, this.#numRows);
    this.#playerOne.initializeOpponent(this.#opponents, this.#board.matrix);
    this.#playerTwo.initializeOpponent(this.#opponents, this.#board.matrix);

    let currentPlayer: 1 | 2 = 1;
    let isDraw = false;

    console.clear();
    this.#userInterface.paintBoard(this.#board.matrix);

    while (true) {
      const player = currentPlayer === 1 ? this.#playerOne : this.#playerTwo;

      const currentMove = player.isHuman
        ? await this.#userInterface.paintTokenDropper(
            player.name,
            this.#board.findFullColumns(),
          )
        : player.opponent?.calculateNextDrop(); // NOTE: Should always exist if isHuman is false

      if (!currentMove) throw new Error("Failed to calculate next move");
      const { maxConnectionFound, boardMatrix, lastMove } =
        this.#board.dropToken(currentMove, currentPlayer);

      this.#userInterface.paintBoard(boardMatrix);

      if (maxConnectionFound >= 4) break;
      if (this.#board.checkIsDraw()) {
        isDraw = true;
        break;
      }

      this.#playerOne.opponent?.analyzeBoard(
        boardMatrix,
        lastMove,
        currentPlayer === 1,
      );
      this.#playerTwo.opponent?.analyzeBoard(
        boardMatrix,
        lastMove,
        currentPlayer === 2,
      );
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    console.log(isDraw ? "Draw!" : `Player ${currentPlayer} probably won`);
    this.run();
  }
}
