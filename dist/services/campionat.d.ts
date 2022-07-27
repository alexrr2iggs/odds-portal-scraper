import { Page } from 'puppeteer';
export declare function getCampionatList(page: Page): Promise<{
    campionat: string;
    url: string;
}[]>;
export declare function getCampionatNextMatches(page: Page): Promise<string>;
export declare function getCampionatLastPage(page: Page): Promise<number>;
//# sourceMappingURL=campionat.d.ts.map