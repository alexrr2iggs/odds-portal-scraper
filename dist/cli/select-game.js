import { Game } from '../types/sport.js';
export var selectGame = {
    name: 'game',
    type: 'list',
    message: 'select a game?',
    choices: Object.keys(Game).map(function (key) { return ({
        name: key,
        value: Game[key]
    }); })
};
//# sourceMappingURL=select-game.js.map