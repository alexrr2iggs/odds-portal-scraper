import { Browser, Page, PuppeteerLaunchOptions, WaitForOptions } from 'puppeteer';

import { launch } from 'puppeteer';
import { writeError } from './error.js';

type GoToPageOptions = WaitForOptions & { referer?: string };

var browser: Browser;
var totPagesVisited = 0;
export const initBrowser = (puppeteerLaunchOptions: PuppeteerLaunchOptions = {}) =>
	launch({ ...puppeteerLaunchOptions }).then((b: Browser) => {
		console.log('browser initialized');
		browser = b;
		return b;
	});

export const getPage = (url?: string, options?: GoToPageOptions) =>
	browser
		.newPage()
		.then(page => initPage(page))
		.then(page => (url ? navigate(page, url, options).then(() => page) : page));

function initPage(page: Page) {
	page.on('console', message => console.log('[PAGE-CONSOLE-OUT]', `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
	page.on('pageerror', (error: Error) => {
		console.error('[PAGE]', 'pageerror', page.url(), error);
		writeError(error, [], page.url());
	});

	page.on('error', (error: Error) => {
		console.error('[PAGE]', 'error', page.url(), error);
		writeError(error, [], page.url());
	});

	return page;
}

export function navigate(page: Page, link: string, options: GoToPageOptions = { waitUntil: ['load', 'domcontentloaded'] }) {
	totPagesVisited++;
	return new Promise((resolve, reject) => {
		let response;
		page
			.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36')
			.then(() => page.goto(link, options).catch(c => reject(c)))
			.then(() => page.goto(link, options).catch(c => reject(c)))
			.then(r => (response = r))
			.finally(() => setTimeout(() => resolve(response)));
	});
}

export const getTTotpagesVisited = () => totPagesVisited;
