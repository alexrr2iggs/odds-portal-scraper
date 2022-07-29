var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { launch } from 'puppeteer';
import { writeError } from './error.js';
var browser;
var totPagesVisited = 0;
export var initBrowser = function (puppeteerLaunchOptions) {
    if (puppeteerLaunchOptions === void 0) { puppeteerLaunchOptions = {}; }
    return launch(__assign({}, puppeteerLaunchOptions)).then(function (b) {
        console.log('browser initialized');
        browser = b;
        return b;
    });
};
export var getPage = function (url, options) {
    return browser
        .newPage()
        .then(function (page) { return initPage(page); })
        .then(function (page) { return (url ? navigate(page, url, options).then(function () { return page; }) : page); });
};
function initPage(page) {
    page.on('console', function (message) { return console.log('[PAGE-CONSOLE-OUT]', "".concat(message.type().substr(0, 3).toUpperCase(), " ").concat(message.text())); });
    page.on('pageerror', function (error) {
        console.error('[PAGE]', 'pageerror', page.url(), error);
        writeError(error, [], page.url());
    });
    page.on('error', function (error) {
        console.error('[PAGE]', 'error', page.url(), error);
        writeError(error, [], page.url());
    });
    return page;
}
export function navigate(page, link, options) {
    if (options === void 0) { options = { waitUntil: ['load', 'domcontentloaded'] }; }
    totPagesVisited++;
    return new Promise(function (resolve, reject) {
        var response;
        page
            .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36')
            .then(function () { return page.goto(link, options)["catch"](function (c) { return reject(c); }); })
            .then(function () { return page.goto(link, options)["catch"](function (c) { return reject(c); }); })
            .then(function (r) { return (response = r); })["finally"](function () { return setTimeout(function () { return resolve(response); }); });
    });
}
export var getTTotpagesVisited = function () { return totPagesVisited; };
//# sourceMappingURL=puppeter.js.map