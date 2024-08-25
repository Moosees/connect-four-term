import Game from "./game/Game.js";
import TerminalUi from "./ui/TerminalUi.js";

console.log("Create new Game");
const game = new Game(new TerminalUi(), {});

console.log("game.run");
game.run();
