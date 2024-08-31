import { BoardCoordinate, BoardMatrix, ComputerOpponent } from "../types.js";

export class OpponentNejlaNew implements ComputerOpponent {
  #dropsWithWeight;

  constructor(board: BoardMatrix) {
    let i = 1;
    let j = board.length;
    const initialsDrops = [];

    while (i <= j) {
      i !== j && initialsDrops.push({ col: i, weight: i * i });
      initialsDrops.push({ col: j--, weight: i * i++ });
    }

    this.#dropsWithWeight = initialsDrops;
  }

  analyzeBoard(
    _board: BoardMatrix,
    _lastMove: BoardCoordinate,
    _isOwnMove: boolean,
  ): void {}

  calculateNextDrop(): number {
    const totalWeight = this.#dropsWithWeight.reduce(
      (sum, term) => sum + term.weight,
      0,
    );
    let randomNumber = Math.floor(Math.random() * totalWeight) + 1;

    for (const drop of this.#dropsWithWeight) {
      if (randomNumber <= drop.weight) return drop.col;
      randomNumber -= drop.weight;
    }

    throw new Error("Could not calculate where to drop");
  }
}
