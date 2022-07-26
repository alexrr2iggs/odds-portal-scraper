import { QuestionCollection } from 'inquirer';
export const continueInterruptedSession: QuestionCollection<{ continueInterruptedSession: boolean }> = {
	name: 'continueInterruptedSession',
	type: 'confirm',
	message: 'continue interrupted session?',
	default: true
};

export const continueInterruptedSessions: QuestionCollection<{ continueInterruptedSessions: boolean }> = {
	name: 'continueInterruptedSessions',
	type: 'confirm',
	message: 'continue interrupted sessions?',
	default: true
};
