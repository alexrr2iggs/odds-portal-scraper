var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { time } from 'iggs-utils';
import { SOCCER_CAMPIONAT_ANCHORS, SOCCER_CAMPIONAT_PAGINATOR_ANCHORS } from '../consts/css-selectors.js';
import { NEXT_MATCH, WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/various.js';
export function getCampionatList(page) {
    return page
        .$eval('#breadcrumb', function (el) { return el.textContent; })
        .then(function (textContent) {
        if (textContent.trim().toUpperCase() === 'THE PAGE YOU REQUESTED IS NOT AVAILABLE.')
            return [];
        return page
            .waitForSelector(SOCCER_CAMPIONAT_ANCHORS, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
            .then(function () { return page.$$eval(SOCCER_CAMPIONAT_ANCHORS, function (anchors) { return anchors === null || anchors === void 0 ? void 0 : anchors.map(function (anchor) { return ({ campionat: anchor.textContent, url: anchor.href }); }); }); })["catch"](function (e) {
            console.error(e);
            return [];
        });
    })
        .then(function (campionatList) {
        return getCampionatNextMatches(page).then(function (campionatNextMatches) {
            return campionatNextMatches ? __spreadArray([{ campionat: NEXT_MATCH, url: campionatNextMatches }], campionatList, true) : campionatList;
        });
    });
}
export function getCampionatNextMatches(page) {
    return page
        .$eval('#breadcrumb', function (el) { return el.textContent; })
        .then(function (textContent) {
        if (textContent.trim().toUpperCase() === 'THE PAGE YOU REQUESTED IS NOT AVAILABLE.')
            return '';
        return page
            .waitForSelector('#tournament_menu a', { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
            .then(function () { return page.$$eval('#tournament_menu a', function (anchors) { var _a; return (_a = anchors === null || anchors === void 0 ? void 0 : anchors.find(function (a) { var _a, _b; return ((_b = (_a = a === null || a === void 0 ? void 0 : a.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === 'NEXT MATCHES'; })) === null || _a === void 0 ? void 0 : _a.href; }); })["catch"](function (e) {
            console.error(e);
            return '';
        });
    });
}
export function getCampionatLastPage(page) {
    return page.$('#emptyMsg').then(function (emptyMsg) {
        if (emptyMsg)
            return -1;
        return page
            .waitForSelector(SOCCER_CAMPIONAT_PAGINATOR_ANCHORS, { timeout: 3 * time.seccond })
            .then(function () {
            return page.$$eval(SOCCER_CAMPIONAT_PAGINATOR_ANCHORS, function (anchors) {
                var _a, _b, _c;
                var lastPage = +((_c = (_b = (_a = anchors === null || anchors === void 0 ? void 0 : anchors[(anchors === null || anchors === void 0 ? void 0 : anchors.length) - 1]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.getNamedItem('x-page')) === null || _c === void 0 ? void 0 : _c.nodeValue);
                return lastPage || 1;
            });
        })["catch"](function () { return 1; });
    });
}
//# sourceMappingURL=campionat.js.map