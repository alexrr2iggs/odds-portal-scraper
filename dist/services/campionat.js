import { time } from 'iggs-utils';
import { SOCCER_CAMPIONAT_ANCHORS, SOCCER_CAMPIONAT_PAGINATOR_ANCHORS } from '../consts/css-selectors.js';
import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/timeouts.js';
export function getCampionatList(page) {
    return page
        .waitForSelector(SOCCER_CAMPIONAT_ANCHORS, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
        .then(function () { return page.$$eval(SOCCER_CAMPIONAT_ANCHORS, function (anchors) { return anchors === null || anchors === void 0 ? void 0 : anchors.map(function (anchor) { return ({ campionat: anchor.textContent, url: anchor.href }); }); }); })["catch"](function (e) {
        console.error(e);
        return [];
    });
}
export function getCampionatLastPage(page) {
    return page.$('#emptyMsg').then(function (emptyMsg) {
        if (emptyMsg)
            return 1;
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