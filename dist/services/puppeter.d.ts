import { Page, PuppeteerLaunchOptions, WaitForOptions } from "puppeteer";
declare type GoToPageOptions = WaitForOptions & {
    referer?: string;
};
export declare function initBrowser(puppeteerLaunchOptions?: PuppeteerLaunchOptions): Promise<void>;
export declare const getPage: (url?: string, options?: GoToPageOptions) => Promise<Page>;
export {};
//# sourceMappingURL=puppeter.d.ts.map