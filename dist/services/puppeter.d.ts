import { Page, PuppeteerLaunchOptions, WaitForOptions } from 'puppeteer';
declare type GoToPageOptions = WaitForOptions & {
    referer?: string;
};
export declare function initBrowser(puppeteerLaunchOptions?: PuppeteerLaunchOptions): Promise<void>;
export declare const getPage: (url?: string, options?: GoToPageOptions) => Promise<Page>;
export declare function goto(page: Page, link: string, options?: GoToPageOptions): Promise<import("puppeteer").HTTPResponse>;
export {};
//# sourceMappingURL=puppeter.d.ts.map