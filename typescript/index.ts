import Game from "./game/Game.js";
import { EasyComputer } from "./opponents/Easy.js";
import { OpponentInitializer } from "./types.js";
import TerminalUi from "./ui/TerminalUi.js";

const opponents: OpponentInitializer[] = [
  { name: "Runar Random", difficulty: 1, constructor: EasyComputer },
];

console.log("Create new Game");
const game = new Game(new TerminalUi(), opponents, {});

console.log("game.run");
game.run();
