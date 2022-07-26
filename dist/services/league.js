import { LEAGUES_ANCHORS } from '../consts/css-selectors.js';
import { WHAIT_FOR_ELEMENT_TIMEOUT } from './../consts/timeouts.js';
export function getLeagueList(page, game) {
    return page
        .waitForSelector(LEAGUES_ANCHORS[game], { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
        .then(function () { return page.$$eval(LEAGUES_ANCHORS[game], function (anchors) { return anchors === null || anchors === void 0 ? void 0 : anchors.map(function (anchor) { return ({ league: anchor.textContent, url: anchor.href }); }); }); })["catch"](function (e) {
        console.error(e);
        return [];
    });
}
//# sourceMappingURL=league.js.map