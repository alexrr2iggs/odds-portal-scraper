import { Page } from "puppeteer";
import { SOCCER_CAMPIONAT_ANCHORS, SOCCER_CAMPIONAT_PAGINATOR_ANCHORS } from "../consts/css-selectors.js";


export function getCampionatList(page: Page): Promise<{ campionat: string, url: string }[]> {
    return page.waitForSelector(SOCCER_CAMPIONAT_ANCHORS, { timeout: 30_000 }).then(() => page.$$eval(
        SOCCER_CAMPIONAT_ANCHORS,
        (anchors: HTMLAnchorElement[]) => anchors?.map(anchor => ({ campionat: anchor.textContent, url: anchor.href }))
    )).catch(e => { console.error(e); return [] });
}

export function gimport { Page } from "puppeteer";
import { SOCCER_CAMPIONAT_ANCHORS, SOCCER_CAMPIONAT_PAGINATOR_ANCHORS } from "../consts/css-selectors.js";


export function getCampionatList(page: Page): Promise<{ campionat: string, url: string }[]> {
    return page.waitForSelector(SOCCER_CAMPIONAT_ANCHORS, { timeout: 30_000 }).then(() => page.$$eval(
        SOCCER_CAMPIONAT_ANCHORS,
        (anchors: HTMLAnchorElement[]) => anchors?.map(anchor => ({ campionat: anchor.textContent, url: anchor.href }))
    )).catch(e => { console.error(e); return [] });
}

export function getCampionatLastPage(page: Page): Promise<number> {
    return page.waitForSelector(SOCCER_CAMPIONAT_PAGINATOR_ANCHORS, { timeout: 30_000 }).then(() => page.$$eval(
        SOCCER_CAMPIONAT_PAGINATOR_ANCHORS,
        (anchors: HTMLAnchorElement[]) => {
            const lastPage = +anchors?.[anchors?.length - 1]?.attributes?.getNamedItem('x-page')?.nodeValue;
            return lastPage || 1;
        }
    )).catch(() => 1);
}

