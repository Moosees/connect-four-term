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

  get matrix() {
    return this.#board;
  }

  #createBoard(numCols: number, numRows: number): BoardMatrix {
    return new Array(numCols)
      .fill(undefined)
      .map((_x) => new Array(numRows).fill(0));
  }

  checkIsDraw() {
    return this.#board.every((col) => col[0] !== 0);
  }

  findFullColumns() {
    return this.#board.map((col) => col[0] !== 0);
  }

  dropToken(col: number, playerNum: BoardCell) {
    const currentCol = this.#board[col - 1];
    let move = { x: col - 1, y: 0 };
    let maxConnection = 1;

    if (currentCol[0] !== 0) throw new Error("Invalid move, col is full");

    for (let i = 0; i <= currentCol.length; ++i) {
      if (i === currentCol.length || currentCol[i] !== 0) {
        currentCol[i - 1] = playerNum;
        move.y = i - 1;
        console.clear();
        console.log(
          `\nDropped ${playerNum === 1 ? "X" : "O"} token in col ${col}, it falls ${i} rows\n`,
        );
        maxConnection = this.#findMaxConnection(move);
        // console.log(`max connection found: ${maxConnection}`);
        break;
      }
    }

    return {
      boardMatrix: this.#board,
      maxConnectionFound: maxConnection,
      lastMove: move,
    };
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
