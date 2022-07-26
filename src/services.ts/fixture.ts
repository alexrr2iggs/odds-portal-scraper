import { Page } from "puppeteer";
import { Fixture } from "../entities/fixture.js";
import { SOCCER_CAMPIONAT_TBODY } from "../consts/css-selectors.js";

export function getFixtures(page: Page): Promise<Fixture[]> {

    return page.waitForSelector(SOCCER_CAMPIONAT_TBODY, { timeout: 30_000 }).then(() => page.$eval(
        SOCCER_CAMPIONAT_TBODY,
        (table: HTMLTableElement) => {
            const retVal: Fixture[] = [];
            const parseQuote = (str:string) => str==='-'?-1:+str;
            const getCleanTxt = (el: HTMLElement) => el.textContent.trim();
            const getDateTh = (tr: HTMLTableRowElement) => tr.querySelector('th.first2.tl') as HTMLTableCellElement;
            const getTimeTd = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
            const getTeamsStr = (tr: HTMLTableRowElement) => tr.querySelector('.table-participant').textContent;
            const getTeams = (tr: HTMLTableRowElement) => getTeamsStr(tr).split(' - ').map(t => t.trim());
            const getScores = (tr: HTMLTableRowElement) =>{
                const txt=tr.querySelector('.table-score'import { Page } from "puppeteer";
import { Fixture } from "../entities/fixture.js";
import { SOCCER_CAMPIONAT_TBODY } from "../consts/css-selectors.js";

export function getFixtures(page: Page): Promise<Fixture[]> {

    return page.waitForSelector(SOCCER_CAMPIONAT_TBODY, { timeout: 30_000 }).then(() => page.$eval(
        SOCCER_CAMPIONAT_TBODY,
        (table: HTMLTableElement) => {
            const retVal: Fixture[] = [];
            const parseQuote = (str:string) => str==='-'?-1:+str;
            const getCleanTxt = (el: HTMLElement) => el.textContent.trim();
            const getDateTh = (tr: HTMLTableRowElement) => tr.querySelector('th.first2.tl') as HTMLTableCellElement;
            const getTimeTd = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
            const getTeamsStr = (tr: HTMLTableRowElement) => tr.querySelector('.table-participant').textContent;
            const getTeams = (tr: HTMLTableRowElement) => getTeamsStr(tr).split(' - ').map(t => t.trim());
            const getScores = (tr: HTMLTableRowElement) =>{
                const txt=tr.querySelector('.table-score').textContent.replace(/\s/g, '');
                const cleanTxt=/\d+:\d+/g.exec(txt)?.[0];
                return cleanTxt?.split(':')?.map(s=> +s)||[];

            } 


            const getQuote1 = (tr: HTMLTableRowElement) => parseQuote(getCleanTxt(tr.querySelectorAll('td').item(3)));

            const getQuotex = (tr: HTMLTableRowElement) => {
                const items = tr.querySelectorAll('td');
                if (items.length === 7) {
                    //return +items.item(4).innerText.trim();
                    return parseQuote(getCleanTxt(tr.querySelectorAll('td').item(4)));
                }

            }
            const getQuote2 = (tr: HTMLTableRowElement) => {
                const items = tr.querySelectorAll('td');
                return parseQuote(getCleanTxt(items.item(items.length - 2)));
            }


            const YYYYMMdd = (date: Date) => {
                const now = new Date();
                const dd = now.getDate();
                const MM = now.getMonth() + 1;
                const YYYY = now.getFullYear();
                return [YYYY, MM, dd].join('-');
            }

            const getDateStr = (tr: HTMLTableRowElement) => {

                var dateStr = getDateTh(tr).innerText.trim();
                const matches = /\d{2}\s[a-z|A-Z]{3}\s\d{4}/.exec(dateStr);
                if (!matches?.length) {

                    if (dateStr.startsWith('Today')) return YYYYMMdd(new Date());
                    if (dateStr.startsWith('Yesterday')) return YYYYMMdd(new Date(Date.now() - 24 * 60 * 60 * 1000));

                    console.error("caroci esti o problema, asta ii datat strana: '", dateStr + "'");
                    return;
                }
                return matches[0];
            };

            const getHourStr = (tr: HTMLTableRowElement) => {
                var dateStr = getTimeTd(tr).innerText;
                return dateStr.trim();
            };

            let actualDateStr: string


            for (var i = 0; i < table.rows.length; i++) {
                const tr = table.rows[i];

                if (tr.classList.contains('nob-border')) {
                    actualDateStr = getDateStr(tr);
                }

                if (tr.classList.contains('deactivate') && actualDateStr?.length) {
                    const time = getHourStr(tr)
                    const dateTimeStr = actualDateStr + ' ' + time;
                    var date: string;
                    try {
                        date = new Date(dateTimeStr).toISOString();
                    } catch (error) {
                        console.error("suka bliaty sint ptoblemi...");
                        console.error('data: ' + actualDateStr, "uara: " + time, "data uara: " + dateTimeStr);
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
                        quote2: getQuote2(tr),
                    } as any)
                }
            }
            return retVal;
        }
    )).catch(e => { console.error(e); return [] });
}
