export type PlayerOptions = {
  isHuman: boolean;
  name: string;
  difficulty: 1 | 2;
};

export default class Player {
  isHuman;
  name;
  difficulty;

  constructor(options: PlayerOptions) {
    this.isHuman = options.isHuman;
    this.name = options.name;
    this.difficulty = options.difficulty;
  }
}
