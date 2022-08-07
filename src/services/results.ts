import { Page } from 'puppeteer';
import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/various.js';
import { Fixture } from '../entities/fixture.js';
import { TOURNAMENT_TABLE_TBODY } from './../consts/css-selectors.js';

// export async function  getResults(resultsPage: Page): Promise<Fixture[]> {
// 	return resultsPage
// 		.waitForSelector(TOURNAMENT_TABLE_TBODY, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
// 		.then(() =>
// 			resultsPage.$eval(TOURNAMENT_TABLE_TBODY, (table: HTMLTableElement) => {

// 				try {
// 					console.log('this',this);
// 					//@ts-ignore
// 					document.page.showHiddenEvents();
// 				} catch (error) {
// 					console.error(error);
// 				}

// 				///--------------------- UTIL FUNCTIONS ---------------------///
// 				const getCleanTxt = (el: HTMLElement) => (el?.innerText || el?.textContent)?.trim();
// 				const parseQuote = (str: string) => (str === '-' ? -1 : +str);
// 				const getDateTh = (tr: HTMLTableRowElement) => tr.querySelector('th.first2.tl') as HTMLTableCellElement;
// 				const getTimeTd = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
// 				const getTeamsStr = (tr: HTMLTableRowElement) => getCleanTxt(tr.querySelector('.table-participant'));
// 				const getTeams = (tr: HTMLTableRowElement) =>
// 					getTeamsStr(tr)
// 						.split(' - ')
// 						.map(t => t.trim());

// 				const getScores = (tr: HTMLTableRowElement) => {
// 					const scoresTd = tr.querySelector('.table-score');
// 					const txt = getCleanTxt(scoresTd as HTMLElement)?.replace(/\s/g, '');
// 					const cleanTxt = /\d+:\d+/g?.exec(txt)?.[0];
// 					return cleanTxt?.split(':')?.map(s => +s) || [];
// 				};

// 				const YYYYMMdd = (date: Date) => {
// 					const dd = date.getDate();
// 					const MM = date.getMonth() + 1;
// 					const YYYY = date.getFullYear();
// 					return [YYYY, MM, dd].join('-');
// 				};

// 				const getDateStr = (tr: HTMLTableRowElement) => {
// 					var dateStr = getDateTh(tr).innerText.trim();
// 					const matches = /\d{2}\s[a-z|A-Z]{3}\s\d{4}/.exec(dateStr);
// 					if (!matches?.length) {
// 						if (dateStr.startsWith('Today')) return YYYYMMdd(new Date());
// 						if (dateStr.startsWith('Yesterday')) return YYYYMMdd(new Date(Date.now() - 24 * 60 * 60 * 1000));
// 						if (dateStr.startsWith('Tomorrow')) return YYYYMMdd(new Date(Date.now() + 24 * 60 * 60 * 1000));

// 						console.error("caroci esti o problema, asta ii datat strana: '", dateStr + "'");
// 						return;
// 					}
// 					return matches[0];
// 				};

// 				const getHourStr = (tr: HTMLTableRowElement) => {
// 					var dateStr = getTimeTd(tr).innerText;
// 					return dateStr.trim();
// 				};

// 				///--------------------- END UTIL FUNCTIONS ---------------------///

// 				const retVal: Fixture[] = [];

// 				let actualDateStr: string;

// 				for (var i = 0; i < table.rows.length; i++) {
// 					const tr = table.rows[i];

// 					if (tr.classList.contains('nob-border')) {
// 						actualDateStr = getDateStr(tr);
// 					}

// 					if ((tr.classList.contains('odd') || tr.classList.contains('deactivate') || tr.attributes.getNamedItem('xeid')) && actualDateStr?.length) {
// 						const time = getHourStr(tr);
// 						const dateTimeStr = actualDateStr + ' ' + time;
// 						var date: string;
// 						try {
// 							date = new Date(dateTimeStr + ' Z').toISOString();
// 							// date = YYYYMMdd(new Date(dateTimeStr)) + ' ' + time;
// 						} catch (error) {
// 							console.error('suka bliaty sint ptoblemi...');
// 							console.error('data: ' + actualDateStr, 'uara: ' + time, 'data uara: ' + dateTimeStr);
// 							console.error(error);
// 						}

// 						const tdLEn = tr.querySelectorAll('td').length;
// 						const isNext = !tr.querySelector('td.table-score');
// 						const hasX = tdLEn === 7 || (tdLEn === 6 && isNext);

// 						var quote1Index = isNext ? 2 : 3;

// 						const quote1 = parseQuote(getCleanTxt(tr.childNodes.item(quote1Index) as HTMLTableCellElement));
// 						const quotex = hasX ? parseQuote(getCleanTxt(tr.childNodes.item(quote1Index + 1) as HTMLTableCellElement)) : undefined;
// 						const quote2 = parseQuote(getCleanTxt(tr.childNodes.item(tdLEn - 2) as HTMLTableCellElement));

// 						const [team1, team2] = getTeams(tr);
// 						const [team1Score, team2Score] = getScores(tr);
// 						retVal.push({
// 							date,
// 							team1,
// 							team2,
// 							team1Score,
// 							team2Score,
// 							quote1,
// 							quotex,
// 							quote2
// 						} as any);
// 						// (tr.childNodes.item(0) as HTMLElement).innerText += ' ✔️';
// 						// (tr.childNodes.item(0) as HTMLElement).style.color = 'green';
// 					}
// 				}
// 				return retVal;
// 			})
// 		)
// 		.catch(e => {
// 			console.error(e);
// 			return [];
// 		});
// }

export async function getResults(resultsPage: Page): Promise<Fixture[]> {
	await resultsPage.waitForSelector(TOURNAMENT_TABLE_TBODY, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT });
	await resultsPage.evaluate(() => {
		try {
			//@ts-ignore
			page.showHiddenEvents();
		} catch (error) {
			console.error(error);
		}
	});

	return await resultsPage.$eval(TOURNAMENT_TABLE_TBODY, (table: HTMLTableElement) => {
		///--------------------- UTIL FUNCTIONS ---------------------///
		const getCleanTxt = (el: HTMLElement) => (el?.innerText || el?.textContent)?.trim();
		const parseQuote = (str: string) => (str === '-' ? -1 : +str);
		const getDateTh = (tr: HTMLTableRowElement) => tr.querySelector('th.first2.tl') as HTMLTableCellElement;
		const getTimeTd = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
		const getTeamsStr = (tr: HTMLTableRowElement) => getCleanTxt(tr.querySelector('.table-participant'));
		const getTeams = (tr: HTMLTableRowElement) =>
			getTeamsStr(tr)
				.split(' - ')
				.map(t => t.trim());

		const getScores = (tr: HTMLTableRowElement) => {
			const scoresTd = tr.querySelector('.table-score');
			const txt = getCleanTxt(scoresTd as HTMLElement)?.replace(/\s/g, '');
			const cleanTxt = /\d+:\d+/g?.exec(txt)?.[0];
			return cleanTxt?.split(':')?.map(s => +s) || [];
		};

		const YYYYMMdd = (date: Date) => {
			const dd = date.getUTCDate();
			const MM = date.getUTCMonth() + 1;
			const YYYY = date.getUTCFullYear();
			return [YYYY, MM, dd].join('-');
		};

		const getDateStr = (tr: HTMLTableRowElement) => {
			var dateStr = getDateTh(tr).innerText.trim();
			const matches = /\d{2}\s[a-z|A-Z]{3}\s\d{4}/.exec(dateStr);
			if (!matches?.length) {
				if (dateStr.startsWith('Today')) return YYYYMMdd(new Date());
				if (dateStr.startsWith('Yesterday')) return YYYYMMdd(new Date(Date.now() - 24 * 60 * 60 * 1000));
				if (dateStr.startsWith('Tomorrow')) return YYYYMMdd(new Date(Date.now() + 24 * 60 * 60 * 1000));

				console.error("caroci esti o problema, asta ii datat strana: '", dateStr + "'");
				return;
			}
			return matches[0];
		};

		const getHourStr = (tr: HTMLTableRowElement) => {
			var dateStr = getTimeTd(tr).innerText;
			return dateStr.trim();
		};

		///--------------------- END UTIL FUNCTIONS ---------------------///

		const retVal: Fixture[] = [];

		let actualDateStr: string;

		for (var i = 0; i < table.rows.length; i++) {
			const tr = table.rows[i];

			if (tr.classList.contains('nob-border')) {
				actualDateStr = getDateStr(tr);
			}

			if ((tr.classList.contains('odd') || tr.classList.contains('deactivate') || tr.attributes.getNamedItem('xeid')) && actualDateStr?.length) {
				const time = getHourStr(tr);
				const dateTimeStr = actualDateStr + ' ' + time;
				var date: string;
				try {
					date = new Date(dateTimeStr + ' Z').toISOString();
					// date = YYYYMMdd(new Date(dateTimeStr)) + ' ' + time;
				} catch (error) {
					console.error('suka bliaty sint ptoblemi...');
					console.error('data: ' + actualDateStr, 'uara: ' + time, 'data uara: ' + dateTimeStr);
					console.error(error);
				}

				const tdLEn = tr.querySelectorAll('td').length;
				const isNext = !tr.querySelector('td.table-score');
				const hasX = tdLEn === 7 || (tdLEn === 6 && isNext);

				var quote1Index = isNext ? 2 : 3;

				const quote1 = parseQuote(getCleanTxt(tr.childNodes.item(quote1Index) as HTMLTableCellElement));
				const quotex = hasX ? parseQuote(getCleanTxt(tr.childNodes.item(quote1Index + 1) as HTMLTableCellElement)) : undefined;
				const quote2 = parseQuote(getCleanTxt(tr.childNodes.item(tdLEn - 2) as HTMLTableCellElement));

				const [team1, team2] = getTeams(tr);
				const [team1Score, team2Score] = getScores(tr);
				retVal.push({
					date,
					team1,
					team2,
					team1Score,
					team2Score,
					quote1,
					quotex,
					quote2
				} as any);
				// (tr.childNodes.item(0) as HTMLElement).innerText += ' ✔️';
				// (tr.childNodes.item(0) as HTMLElement).style.color = 'green';
			}
		}
		return retVal;
	});
}
