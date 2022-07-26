import { QuestionCollection } from 'inquirer';
import { PuppeteerLaunchOptions } from 'puppeteer';

export const headlesConfirm: QuestionCollection<PuppeteerLaunchOptions> = {
	name: 'headless',
	type: 'confirm',
	message: 'headless?',
	default: true
};
