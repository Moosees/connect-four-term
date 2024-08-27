import { input, number, select } from "@inquirer/prompts";
import prompt from "inquirer-interactive-list-prompt";
import {
  BoardMatrix,
  GameOptions,
  OpponentInitializer,
  UserInterface,
} from "../types.js";
import { getOptionsChoices } from "./terminalUi-utils.js";

export default class TerminalUi implements UserInterface {
  async paintStart() {
    const answer = await prompt({
      message: "Please select an option",
      choices: [
        { name: "Start game", value: "start", key: "s" },
        { name: "Options", value: "options", key: "o" },
        { name: "Quit", value: "quit", key: "q" },
      ],
    });

    if (answer !== "start" && answer !== "options" && answer !== "quit")
      throw new Error("Invalid choice");

    return answer;
  }

  async paintOptions(options: GameOptions, opponents: OpponentInitializer[]) {
    let selected = "menu";
    const newOptions = { p1: { ...options.p1 }, p2: { ...options.p2 } };
    const { p1, p2 } = newOptions;

    while (selected !== "exit") {
      const answer = await select({
        message: "Available options:",
        choices: getOptionsChoices(newOptions),
        default: selected,
      });

      selected = answer;

      if (answer === "p1ih") p1.isHuman = !p1.isHuman;
      else if (answer === "p2ih") p2.isHuman = !p2.isHuman;
      else if (answer === "p1opponent")
        p1.opponentId = await this.#paintAIchange(p1.opponentId, opponents);
      else if (answer === "p2opponent")
        p2.opponentId = await this.#paintAIchange(p2.opponentId, opponents);
      else if (answer === "p1name")
        p1.name = await this.#paintNameChange(p1.name);
      else if (answer === "p2name")
        p2.name = await this.#paintNameChange(p2.name);
    }

    return newOptions;
  }

  async #paintNameChange(oldName: string) {
    return await input({
      message: "New name:",
      default: oldName,
      required: true,
    });
  }

  async #paintAIchange(currentId: number, oppoents: OpponentInitializer[]) {
    console.log(currentId, oppoents);
    return 1 as const;
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
    return "done" as const;
  }

  async paintTokenDropper(playerName: string, numCols: number) {
    const selectedCol = await number({
      message: `${playerName}, please select a column to play: `,
      min: 1,
      max: numCols,
      required: true,
    });

    if (!selectedCol) throw new Error("Invalid play");

    return selectedCol;
  }
}
