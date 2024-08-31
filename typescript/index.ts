import Game from "./game/Game.js";
import { OpponentNejlaNew } from "./opponents/OppoenentNejlaNew.js";
import { OpponentRunarRandom } from "./opponents/OpponentRunarRandom.js";
import { OpponentInitializer } from "./types.js";
import TerminalUi from "./ui/TerminalUi.js";

const opponents: OpponentInitializer[] = [
  {
    id: 1,
    name: "Runar Random",
    difficulty: "Very Easy",
    constructor: OpponentRunarRandom,
  },
  {
    id: 2,
    name: "Nejla New",
    difficulty: "Easy",
    constructor: OpponentNejlaNew,
  },
];

console.log("Create new Game");
const game = new Game(new TerminalUi(), opponents, {});

console.log("game.run");
game.run();
