import { BoardMatrix } from "./Board.js";

export default class Gui {
  paintBoard(board: BoardMatrix) {
    const boardString = board
      .reduce((acc, col) => {
        for (const [i, cell] of col.entries()) {
          acc[i] += ` ${cell} |`;
        }
        return acc;
      }, new Array(board[0].length).fill("|"))
      .join("\n");

    console.log(boardString + "\n");
  }
}
