import { Browser, Page, PuppeteerLaunchOptions, WaitForOptions } from 'puppeteer';

import { launch } from 'puppeteer';
import { writeError } from './error';

type GoToPageOptions = WaitForOptions & { referer?: string };

var browser: Browser;

export async function initBrowser(puppeteerLaunchOptions: PuppeteerLaunchOptions = {}) {
	browser = await launch({ ...puppeteerLaunchOptions });
}
export const getPage = (url?: string, options?: GoToPageOptions) => {
	return browser
		.newPage()
		.then(page => initPage(page))
		.then(page => (url ? goto(page, url, options).then(() => page) : page));
};

// export const newPage$ = (url?: string, options?: GoToPageOptions) =>
//     browser$.pipe(
//         concatMap(browser =>
//             browser.newPage()
//                 .then((page) => initPage(page))
//                 .then((page) => url ? page.goto(url, options).then(() => page) : page)));

function initPage(page: Page) {
	page.on('console', message => console.log('[PAGE-CONSOLE-OUT]', `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
	page.on('pageerror', (error: Error) => {
		console.error(error);
		writeError(error, [], page.url());
	});
	// .on('response', response =>
	//     console.log(`${response.status()} ${response.url()}`))
	// .on('requestfailed', request =>
	//     console.log(`${request.failure().errorText} ${request.url()}`));

	return page;
}

export function goto(page: Page, link: string, options?: GoToPageOptions) {
	return page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36').then(() => page.goto(link, options));
}
