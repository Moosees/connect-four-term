import { number, select } from "@inquirer/prompts";
import prompt from "inquirer-interactive-list-prompt";
import { BoardMatrix } from "./Board.js";
import { getOptionsChoices } from "./gui-utils.js";
import { PlayerOptions } from "./Player.js";

export default class Gui {
  async paintStart() {
    const answer = await prompt({
      message: "Please select an option",
      choices: [
        { name: "Start game", value: "start", key: "s" },
        { name: "Options", value: "options", key: "o" },
        { name: "Quit", value: "quit", key: "q" },
      ],
    });

    console.log(answer);
  }

  async paintOptions(options: { p1: PlayerOptions; p2: PlayerOptions }) {
    let selected = "menu";
    const newOptions = { p1: { ...options.p1 }, p2: { ...options.p2 } };

    while (selected !== "exit") {
      const answer = await select({
        message: "Available options:",
        choices: getOptionsChoices(newOptions),
      });
      console.log(answer);
      selected = answer;
    }
  }

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

  async paintTokenDropper(playerName: string, numCols: number) {
    const selectedCol = await number({
      message: `${playerName}, please select a column to play: `,
      min: 1,
      max: numCols,
      required: true,
    });

    console.log(selectedCol);
  }
}
