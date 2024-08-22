type CellValues = 0 | 1 | 2;

export default class Board {
  #board: CellValues[][];

  constructor(numCols: number, numRows: number) {
    this.#board = this.#createBoard(numCols, numRows);
  }

  #createBoard(numCols: number, numRows: number): CellValues[][] {
    return new Array(numCols)
      .fill(undefined)
      .map((_x) => new Array(numRows).fill(0));
  }

  dropToken(col: number, playerNum: CellValues) {
    const currentCol = this.#board[col];

    if (currentCol[0] !== 0) throw new Error("Invalid move, col is full");

    for (let i = 0; i <= currentCol.length; ++i) {
      if (currentCol[i] !== 0 || i === currentCol.length) {
        currentCol[i - 1] = playerNum;
        console.log(
          `adding token ${playerNum} to col ${col}, it falls to row ${i - 1}`,
        );
        console.log(this.#board);

        return { x: col, y: i - 1 };
      }
    }
  }

  findWinningConnection(lastPlayedCell: { x: number; y: number }) {
    console.log(this.#board[lastPlayedCell.x][lastPlayedCell.y]);
  }
}
