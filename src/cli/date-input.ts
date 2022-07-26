import { QuestionCollection } from 'inquirer';

export const startDateIn: QuestionCollection<{ start: string }> = {
	name: 'start',
	type: 'input',
	message: 'start date (ISO-8601 format, ex "2022-07-25")'
};

export const endDateIn: QuestionCollection<{ start: string }> = {
	name: 'end',
	type: 'input',
	message: 'end date (ISO-8601 format, ex "2022-07-25")',
	default: new Date().toISOString()
};
