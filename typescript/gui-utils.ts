import { PlayerOptions } from "./Player.js";

export const getOptionsChoices = (options: {
  p1: PlayerOptions;
  p2: PlayerOptions;
}) => {
  const { p1, p2 } = options;

  const choices = [
    {
      name: `Player One is ${p1.isHuman ? "HUMAN" : "AI"}`,
      value: "p1ih",
    },
    {
      name: `Player Two is ${p2.isHuman ? "HUMAN" : "AI"}`,
      value: "p2ih",
    },
  ];

  choices.push(
    p1.isHuman
      ? {
          name: `Change "${p1.name}" name`,
          value: "p1name",
        }
      : {
          name: `Change Player One difficulty (currently: ${p1.difficulty === 1 ? "Easy" : "Hard"})`,
          value: "p1diff",
        },
  );

  choices.push(
    p2.isHuman
      ? {
          name: `Change "${p2.name}" name`,
          value: "p2name",
        }
      : {
          name: `Change Player Two difficulty (currently: ${p2.difficulty === 1 ? "Easy" : "Hard"})`,
          value: "p2diff",
        },
  );

  choices.push({
    name: "Exit",
    value: "exit",
  });

  return choices;
};
