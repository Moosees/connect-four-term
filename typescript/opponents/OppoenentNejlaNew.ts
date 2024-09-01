import { traversals } from "../game/board-utils.js";
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
    board: BoardMatrix,
    _lastMove: BoardCoordinate,
    isOwnMove: boolean,
  ): void {
    if (isOwnMove) return;

    const possibleDrops = this.#findPossibleDrops(board);
    this.#dropsWithWeight = possibleDrops.map((coord) => {
      return {
        col: coord.x + 1,
        weight: this.#calculateWeightForDrop(board, coord),
      };
    });
  }

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

  #findPossibleDrops(board: BoardMatrix) {
    const drops: BoardCoordinate[] = [];

    return board.reduce((acc, col, i) => {
      const y = col.findLastIndex((cell) => cell === 0);

      if (y === -1) return acc;

      return [...acc, { x: i, y }];
    }, drops);
  }

  #calculateWeightForDrop(board: BoardMatrix, coord: BoardCoordinate) {
    let weight = 0;

    for (const { forward, reverse } of traversals) {
      weight += this.#traverseBoard(board, coord, forward);
      weight += this.#traverseBoard(board, coord, reverse);
    }

    return weight;
  }

  #traverseBoard(
    board: BoardMatrix,
    start: BoardCoordinate,
    direction: BoardCoordinate,
  ) {
    const width = board.length;
    const height = board[0].length;
    const currentLocation = { ...start };
    let weight = 0;
    let stepsTaken = 0;
    let player: 1 | 2 | undefined = undefined;

    while (stepsTaken < 4) {
      currentLocation.x += direction.x;
      currentLocation.y += direction.y;

      if (
        currentLocation.x < 0 ||
        currentLocation.x >= width ||
        currentLocation.y < 0 ||
        currentLocation.y >= height
      )
        break;

      const currentPlayer = board[currentLocation.x][currentLocation.y];
      if (currentPlayer === 0 || (player && player !== currentPlayer)) break;

      player = currentPlayer;
      weight += 5 * ++stepsTaken * stepsTaken;
    }

    return weight;
  }
}
