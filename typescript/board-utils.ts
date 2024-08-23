export const traversals = [
  {
    angle: 0,
    label: "vertical",
    forward: { x: 0, y: -1 },
    reverse: { x: 0, y: 1 },
  },
  {
    angle: 45,
    label: "diagonal",
    forward: { x: 1, y: -1 },
    reverse: { x: -1, y: 1 },
  },
  {
    angle: 90,
    label: "horizontal",
    forward: { x: 1, y: 0 },
    reverse: { x: -1, y: 0 },
  },
  {
    angle: 135,
    label: "diagonal",
    forward: { x: 1, y: 1 },
    reverse: { x: -1, y: -1 },
  },
];
