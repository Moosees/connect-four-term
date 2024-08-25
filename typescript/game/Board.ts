import { BoardCell, BoardCoordinate, BoardMatrix } from "../types.js";
import { traversals } from "./board-utils.js";

export default class Board {
  #board;
  #numCols;
  #numRows;

  constructor(numCols: number, numRows: number) {
    this.#board = this.#createBoard(numCols, numRows);
    this.#numCols = numCols;
    this.#numRows = numRows;
  }

  #createBoard(numCols: number, numRows: number): BoardMatrix {
    return new Array(numCols)
      .fill(undefined)
      .map((_x) => new Array(numRows).fill(0));
  }

  dropToken(col: number, playerNum: BoardCell) {
    const currentCol = this.#board[col];
    let maxConnection = 1;

    if (currentCol[0] !== 0) throw new Error("Invalid move, col is full");

    for (let i = 0; i <= currentCol.length; ++i) {
      if (currentCol[i] !== 0 || i === currentCol.length) {
        currentCol[i - 1] = playerNum;
        console.log(
          `adding token ${playerNum} to col ${col}, it falls to row ${i - 1}`,
        );
        maxConnection = this.#findMaxConnection({
          x: col,
          y: i - 1,
        });
        console.log(`max connection found: ${maxConnection}`);
        break;
      }
    }

    return { board: this.#board, maxConnection };
  }

  #traverseUntilStopped(startPos: BoardCoordinate, direction: BoardCoordinate) {
    const validCellValue = this.#board[startPos.x][startPos.y];
    let currentX = startPos.x;
    let currentY = startPos.y;
    let cellsMoved = 0;

    while (true) {
      currentX += direction.x;
      currentY += direction.y;

      if (
        currentX < 0 ||
        currentY < 0 ||
        currentX >= this.#numCols ||
        currentY >= this.#numRows ||
        this.#board[currentX][currentY] !== validCellValue
      ) {
        break;
      }

      ++cellsMoved;
    }

    return cellsMoved;
  }

  #findMaxConnection(lastPlayedCell: BoardCoordinate) {
    let maxConnection = 1;

    for (let move of traversals) {
      let currentConnection = 1;

      currentConnection += this.#traverseUntilStopped(
        lastPlayedCell,
        move.forward,
      );
      currentConnection += this.#traverseUntilStopped(
        lastPlayedCell,
        move.reverse,
      );

      if (currentConnection > maxConnection) maxConnection = currentConnection;
      if (maxConnection >= 4) break;
    }

    return maxConnection;
  }
}
