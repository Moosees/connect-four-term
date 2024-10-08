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
    console.clear();
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

  @exitErrorHandler
  async paintWinScreen(winner: string, isDraw: boolean) {
    await input({
      message: isDraw ? "It's draw!" : `${winner} is the winner!`,
      theme: { prefix: "" },
    });

    return "done" as const;
  }

  @exitErrorHandler
  async paintOptions(options: GameOptions, opponents: OpponentInitializer[]) {
    console.clear();
    let selected = "menu";
    const newOptions = { p1: { ...options.p1 }, p2: { ...options.p2 } };
    const { p1, p2 } = newOptions;

    while (selected !== "exit") {
      const answer = await select({
        message: "Available options:",
        choices: getOptionsChoices(newOptions),
        default: selected,
      });

      selected = answer || "menu";

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

    console.log(newOptions);
    return newOptions;
  }

  @exitErrorHandler
  async #paintNameChange(oldName: string) {
    console.clear();
    return await input({
      message: "New name:",
      default: oldName,
      required: true,
    });
  }

  @exitErrorHandler
  async #paintAIchange(currentId: number, oppoents: OpponentInitializer[]) {
    console.clear();
    return await select({
      message: "Select an opponent",
      default: currentId,
      choices: oppoents.map((opponent) => ({
        name: `${opponent.name} (${opponent.difficulty})`,
        value: opponent.id,
      })),
    });
  }

  paintBoard(board: BoardMatrix) {
    const tiles = {
      0: " ",
      1: "X",
      2: "O",
    };

    const boardString = board
      .reduce(
        (acc, col) => {
          for (const [i, cell] of col.entries()) {
            acc[i * 2] += ` ${tiles[cell]} |`;
            acc[i * 2 + 1] += "---|";
          }
          return acc;
        },
        new Array(board[0].length * 2).fill("|"),
      )
      .join("\n");

    const header =
      " " +
      new Array(board.length)
        .fill("")
        .map((_x, i) => ` ${i + 1} `)
        .join(" ");
    const separator = "|" + new Array(board.length).fill("---|").join("");
    console.log(header + "\n" + separator + "\n" + boardString + "\n");
    return "done" as const;
  }

  @exitErrorHandler
  async paintTokenDropper(playerName: string, fullColumns: boolean[]) {
    let isFull = false;

    while (true) {
      const selectedCol = await number({
        message: isFull
          ? "Column is full, please try again..."
          : `${playerName}, please select a column to play: `,
        min: 1,
        max: fullColumns.length,
        required: true,
      });

      if (!selectedCol) throw new Error("Selected column must be a number");
      if (fullColumns[selectedCol - 1]) {
        isFull = true;
        continue;
      }

      return selectedCol;
    }
  }
}

function exitErrorHandler<
  This,
  Args extends any[],
  Return,
  Fn extends (this: This, ...args: Args) => Promise<Return>,
>(original: Fn, _context: ClassMethodDecoratorContext<This, Fn>) {
  return async function replacement(
    this: This,
    ...args: Args
  ): Promise<Return | undefined> {
    try {
      return await original.call(this, ...args);
    } catch (error) {
      if (error instanceof Error && error.name === "ExitPromptError") {
        console.log("\nThanks for playing!\n");
        process.exit();
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("No idea what is going on");
      }
    }
  } as Fn;
}
