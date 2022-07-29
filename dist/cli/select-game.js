import { Game } from '../types/sport.js';
export var selectGames = {
    name: 'games',
    type: 'checkbox',
    message: 'select games',
    choices: Object.keys(Game).map(function (key) { return ({
        name: key,
        value: Game[key]
    }); })
};
//# sourceMappingURL=select-game.js.map