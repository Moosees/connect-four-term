export type BoardCell = 0 | 1 | 2;
export type BoardCoordinate = { x: number; y: number };
export type BoardMatrix = BoardCell[][];

export type PlayerOptions = {
  isHuman: boolean;
  name: string;
  difficulty: 1 | 2;
};
