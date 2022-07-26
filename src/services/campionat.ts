import { time } from 'iggs-utils';
import { Page } from 'puppeteer';
import { SOCCER_CAMPIONAT_ANCHORS, SOCCER_CAMPIONAT_PAGINATOR_ANCHORS } from '../consts/css-selectors.js';
import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/timeouts.js';

export function getCampionatList(page: Page): Promise<{ campionat: string; url: string }[]> {
	// document.querySelector('#breadcrumb').innerText === 'The page you requested is not available.';
	return page
		.$eval('#breadcrumb', el => el.textContent)
		.then(textContent => {
			if (textContent.trim().toUpperCase() === 'THE PAGE YOU REQUESTED IS NOT AVAILABLE.') return [];
			return page
				.waitForSelector(SOCCER_CAMPIONAT_ANCHORS, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
				.then(() => page.$$eval(SOCCER_CAMPIONAT_ANCHORS, (anchors: HTMLAnchorElement[]) => anchors?.map(anchor => ({ campionat: anchor.textContent, url: anchor.href }))))
				.catch(e => {
					console.error(e);
					return [];
				});
		});
}

export function getCampionatLastPage(page: Page): Promise<number> {
	return page.$('#emptyMsg').then(emptyMsg => {
		if (emptyMsg) return -1;

		return page
			.waitForSelector(SOCCER_CAMPIONAT_PAGINATOR_ANCHORS, { timeout: 3 * time.seccond })
			.then(() =>
				page.$$eval(SOCCER_CAMPIONAT_PAGINATOR_ANCHORS, (anchors: HTMLAnchorElement[]) => {
					const lastPage = +anchors?.[anchors?.length - 1]?.attributes?.getNamedItem('x-page')?.nodeValue;
					return lastPage || 1;
				})
			)
			.catch(() => 1);
	});
}
