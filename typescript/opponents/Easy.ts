import { BoardMatrix, ComputerOpponent } from "../types.js";

export class EasyComputer implements ComputerOpponent {
  #possibleDrops: number[] = [];

  constructor(board: BoardMatrix) {
    this.analyzeBoard(board);
  }

  analyzeBoard(board: BoardMatrix): void {
    this.#possibleDrops = board.reduce((acc: number[], col, i) => {
      if (col[0] === 0) acc.push(i + 1);
      return acc;
    }, []);
  }

  calculateNextDrop(): number {
    const randomNumber = Math.floor(Math.random() * this.#possibleDrops.length);

    return this.#possibleDrops[randomNumber];
  }
}
