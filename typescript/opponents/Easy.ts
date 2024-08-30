import { BoardCoordinate, BoardMatrix, ComputerOpponent } from "../types.js";

export class EasyComputer implements ComputerOpponent {
  #possibleDrops: number[] = [];

  constructor(board: BoardMatrix) {
    this.#generatePossibleDrops(board);
  }

  analyzeBoard(
    board: BoardMatrix,
    _lastMove: BoardCoordinate,
    _isOwnMove: boolean,
  ): void {
    this.#generatePossibleDrops(board);
  }

  calculateNextDrop(): number {
    const randomNumber = Math.floor(Math.random() * this.#possibleDrops.length);

    return this.#possibleDrops[randomNumber];
  }

  #generatePossibleDrops(board: BoardMatrix) {
    this.#possibleDrops = board.reduce((acc: number[], col, i) => {
      if (col[0] === 0) acc.push(i + 1);
      return acc;
    }, []);
  }
}
