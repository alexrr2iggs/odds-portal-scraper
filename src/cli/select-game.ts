import { QuestionCollection } from 'inquirer';
import { Game } from '../types/sport.js';

export const selectGames: QuestionCollection<{ games: Game[] }> = {
	name: 'games',
	type: 'checkbox',
	message: 'select games?',
	choices: Object.keys(Game).map(key => ({
		name: key,
		value: Game[key]
	}))
};
