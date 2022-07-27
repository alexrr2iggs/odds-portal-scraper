import { Page } from 'puppeteer';
import { LEAGUES_ANCHORS } from '../consts/css-selectors.js';
import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/various.js';
// import { SOCCER_LEAGUES_ANCHORS } from "../consts/css-selectors.js";
import { Game } from '../types/sport.js';

export function getLeagueList(page: Page, game: Game): Promise<{ league: string; url: string }[]> {
	return page
		.waitForSelector(LEAGUES_ANCHORS[game], { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
		.then(() => page.$$eval(LEAGUES_ANCHORS[game], (anchors: HTMLAnchorElement[]) => anchors?.map(anchor => ({ league: anchor.textContent, url: anchor.href }))))
		.catch(e => {
			console.error(e);
			return [];
		});
}
