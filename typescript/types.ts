export type UIStartChoices = "start" | "options" | "quit";

export type BoardCell = 0 | 1 | 2;
export type BoardCoordinate = { x: number; y: number };
export type BoardMatrix = BoardCell[][];

export type PlayerOptions = {
  isHuman: boolean;
  name: string;
  difficulty: 1 | 2;
};

export type GameOptions = { p1: PlayerOptions; p2: PlayerOptions };

export interface UserInterface {
  paintStart(): Promise<UIStartChoices>;
  paintOptions(
    options: GameOptions,
    opponents: OpponentInitializer[],
  ): Promise<GameOptions>;
  paintBoard(board: BoardMatrix): "done";
  paintTokenDropper(playerName: string, numCols: number): Promise<number>;
}

export interface ComputerOpponent {
  analyzeBoard(board: BoardMatrix): void;
  calculateNextDrop(): number;
}

export type OpponentInitializer = {
  name: string;
  difficulty: number;
  constructor: new (board: BoardMatrix) => ComputerOpponent;
};
