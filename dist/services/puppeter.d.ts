import { Browser, Page, PuppeteerLaunchOptions, WaitForOptions } from 'puppeteer';
declare type GoToPageOptions = WaitForOptions & {
    referer?: string;
};
export declare const initBrowser: (puppeteerLaunchOptions?: PuppeteerLaunchOptions) => Promise<Browser>;
export declare const getPage: (url?: string, options?: GoToPageOptions) => Promise<any>;
export declare function navigate(page: Page, link: string, options?: GoToPageOptions): any;
export declare const getTTotpagesVisited: () => number;
export {};
//# sourceMappingURL=puppeter.d.ts.map