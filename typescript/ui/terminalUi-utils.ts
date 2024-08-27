import { PlayerOptions } from "../types.js";

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
          name: `Change first opponent`,
          value: "p1opponent",
        },
  );

  choices.push(
    p2.isHuman
      ? {
          name: `Change "${p2.name}" name`,
          value: "p2name",
        }
      : {
          name: `Change second opponent`,
          value: "p2opponent",
        },
  );

  choices.push({
    name: "Exit",
    value: "exit",
  });

  return choices;
};
