import { QuestionCollection } from 'inquirer';
import { Game } from '../types/sport.js';

export const selectGame: QuestionCollection<{ game: Game }> = {
	name: 'game',
	type: 'list',
	message: 'select a game?',
	choices: Object.keys(Game).map(key => ({
		name: key,
		value: Game[key]
	}))
};
