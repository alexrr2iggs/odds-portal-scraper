import { Page } from 'puppeteer';
import { MATCHES_TBODY } from '../consts/css-selectors.js';
import { Fixture } from '../entities/fixture.js';

export function getMatches(page: Page): Promise<Fixture[]> {
	return page
		.waitForSelector(MATCHES_TBODY, { timeout: 2000_000 })
		.then(() =>
			page.$eval(MATCHES_TBODY, (table: HTMLTableElement) => {
				//taking the date as a string from page path, format: /matches/ 2020-01-01
				const path = window.location.pathname.split('/');
				const datestr = path[path.length - 2];
				const dateStrFormatted = datestr.substring(0, 4) + '-' + datestr.substring(4, 6) + '-' + datestr.substring(6, 8);

				const retVal: Fixture[] = [];

				const parseQuote = (str: string) => (str === '-' ? -1 : +str);
				const getCleanTxt = (el: HTMLElement) => el.textContent.trim();
				const getTimeTd = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
				const getLeague = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
				const getTeamsStr = (tr: HTMLTableRowElement) => tr.querySelector('.table-participant').textContent;
				const getTeams = (tr: HTMLTableRowElement) =>
					getTeamsStr(tr)
						.split(' - ')
						.map(t => t.trim());
				const getScores = (tr: HTMLTableRowElement) => {
					const txt = tr.querySelector('.table-score').textContent.replace(/\s/g, '');
					const cleanTxt = /\d+:\d+/g.exec(txt)?.[0];
					return cleanTxt?.split(':')?.map(s => +s) || [];
				};

				const getQuote1 = (tr: HTMLTableRowElement) => parseQuote(getCleanTxt(tr.querySelectorAll('td').item(3)));

				const getQuotex = (tr: HTMLTableRowElement) => {
					const items = tr.querySelectorAll('td');
					const qoteTxt = tr.querySelectorAll('td').item(4);

					if (items.length === 6) return;

					return parseQuote(getCleanTxt(qoteTxt));
				};

				const getQuote2 = (tr: HTMLTableRowElement) => {
					const items = tr.querySelectorAll('td');
					return parseQuote(getCleanTxt(items.item(items.length - 2)));
				};

				const YYYYMMdd = (date: Date) => {
					const dd = date.getDate();
					const MM = date.getMonth() + 1;
					const YYYY = date.getFullYear();
					return [YYYY, MM, dd].join('-');
				};

				const getHourStr = (tr: HTMLTableRowElement) => {
					var dateStr = getTimeTd(tr).innerText;
					return dateStr.trim();
				};

				let league: string;
				let campionat: string;

				for (var i = 0; i < table.rows.length; i++) {
					const tr = table.rows[i];

					if (tr.className === 'dark center') {
						continue;
					}

					if (tr.classList.contains('deactivate')) {
						const time = getHourStr(tr);
						const dateTimeStr = dateStrFormatted + ' ' + time;
						var date: string;
						try {
							date = new Date(dateTimeStr).toISOString();
						} catch (error) {
							console.error('date parsing error, future mathes...');
							console.error('date: ' + dateStrFormatted, 'time: ' + time, 'date time: ' + dateTimeStr);
							console.error(error);
						}
						const [team1, team2] = getTeams(tr);
						const [team1Score, team2Score] = getScores(tr);
						retVal.push({
							date,
							team1,
							team2,
							team1Score,
							team2Score,
							quote1: getQuote1(tr),
							quotex: getQuotex(tr),
							quote2: getQuote2(tr)
						} as any);
					}
				}
				return retVal;
			})
		)
		.catch(e => {
			console.error(e);
			return Promise.reject(e);
		});
}
