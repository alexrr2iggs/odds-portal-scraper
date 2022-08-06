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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { time } from 'iggs-utils';
import { launch } from 'puppeteer';
import { sleep } from '../utils/varoius.js';
import { writeError } from './error.js';
var browser;
var totPagesVisited = 0;
export var initBrowser = function (puppeteerLaunchOptions) {
    if (puppeteerLaunchOptions === void 0) { puppeteerLaunchOptions = {}; }
    return launch(__assign(__assign({}, puppeteerLaunchOptions), { args: ['--no-sandbox', '--disable-setuid-sandbox'] })).then(function (b) {
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
    return __awaiter(this, void 0, void 0, function () {
        var resp, error_1, i, resp_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totPagesVisited++;
                    return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36')];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 7]);
                    return [4 /*yield*/, page.goto(link, options)];
                case 3:
                    resp = _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [4 /*yield*/, sleep(30 * time.seccond)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, navigate(page, link, options)];
                case 6: return [2 /*return*/, _a.sent()];
                case 7:
                    i = 1;
                    _a.label = 8;
                case 8:
                    if (!(i <= 30)) return [3 /*break*/, 12];
                    return [4 /*yield*/, page.goto(link, options)];
                case 9:
                    resp_1 = _a.sent();
                    if (!badResponse(resp_1))
                        return [2 /*return*/, resp_1];
                    console.error(resp_1.statusText() + '' + resp_1.status(), 'err navigating to:', link, 'attempt:' + i);
                    return [4 /*yield*/, sleep(i * time.seccond)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 8];
                case 12:
                    writeError(resp.statusText() + ' ' + resp.status(), [], page.url());
                    process.exit(1);
                    return [2 /*return*/];
            }
        });
    });
}
export var getTTotpagesVisited = function () { return totPagesVisited; };
function badResponse(resp) {
    var status = resp.status();
    if (status < 400)
        return false;
    var pathParts = splitUrl(resp.url());
    if (pathParts[pathParts.length - 1] === 'results' && resp.status() === 404)
        return false;
    return true;
}
var splitUrl = function (url) { var _a; return (_a = url === null || url === void 0 ? void 0 : url.split('/')) === null || _a === void 0 ? void 0 : _a.filter(function (s) { var _a; return (_a = s === null || s === void 0 ? void 0 : s.trim()) === null || _a === void 0 ? void 0 : _a.length; }); };
//# sourceMappingURL=puppeter.js.map