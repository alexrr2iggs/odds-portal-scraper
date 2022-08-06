import { time } from 'iggs-utils';
import { Browser, HTTPResponse, Page, PuppeteerLaunchOptions, WaitForOptions } from 'puppeteer';

import { launch } from 'puppeteer';
import { sleep } from '../utils/varoius.js';
import { writeError } from './error.js';

type GoToPageOptions = WaitForOptions & { referer?: string };

var browser: Browser;
var totPagesVisited = 0;
export const initBrowser = (puppeteerLaunchOptions: PuppeteerLaunchOptions = {}) =>
	launch({ ...puppeteerLaunchOptions, args:['--no-sandbox', '--disable-setuid-sandbox'] }).then((b: Browser) => {
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

export async function navigate(page: Page, link: string, options: GoToPageOptions = { waitUntil: ['load', 'domcontentloaded'] }) {
	totPagesVisited++;
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
	var resp:HTTPResponse;
	try {
		resp = await page.goto(link, options);
	} catch (error) {
		console.error(error);
		await sleep(30*time.seccond);
		return await navigate(page, link, options);
	}

	for(let i=1;i<=30;i++){
		const resp = await page.goto(link, options);
		if(!badResponse(resp)) return resp;
		console.error(resp.statusText()+''+resp.status(), 'err navigating to:', link, 'attempt:'+i);
		await sleep(i*time.seccond);
	}

	writeError(resp.statusText()+' '+resp.status() as any, [], page.url());
	process.exit(1);
}

export const getTTotpagesVisited = () => totPagesVisited;


function badResponse(resp:HTTPResponse):boolean{
	const status=resp.status();

	if(status<400) return false;
	
	const pathParts=splitUrl(resp.url());

	if(pathParts[pathParts.length-1]==='results' && resp.status()===404) return false;

	return true;
}

const splitUrl=(url:string)=> url?.split('/')?.filter(s=> s?.trim()?.length);