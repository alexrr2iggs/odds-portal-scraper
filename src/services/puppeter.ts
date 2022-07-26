import { Browser, Page, PuppeteerLaunchOptions, WaitForOptions } from "puppeteer";

import { launch } from 'puppeteer';


type GoToPageOptions = WaitForOptions & { referer?: string; }



var browser: Browser;




export async function initBrowser(puppeteerLaunchOptions?: PuppeteerLaunchOptions){
    browser = await launch(puppeteerLaunchOptions);
}
export const getPage = (url?: string, options?: GoToPageOptions) => {
    return browser.newPage()
        .then((page) => initPage(page))
        .then((page) => url ? page.goto(url, options).then(() => page) : page);
}


// export const newPage$ = (url?: string, options?: GoToPageOptions) =>
//     browser$.pipe(
//         concatMap(browser =>
//             browser.newPage()
//                 .then((page) => initPage(page))
//                 .then((page) => url ? page.goto(url, options).then(() => page) : page)));


function initPage(page: Page) {
    page
        .on('console', message =>
            console.log('[PAGE-CONSOLE-OUT]', `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
        .on('pageerror', ({ message }) => console.log(message))
    // .on('response', response =>
    //     console.log(`${response.status()} ${response.url()}`))
    // .on('requestfailed', request =>
    //     console.log(`${request.failure().errorText} ${request.url()}`));

    return page
}