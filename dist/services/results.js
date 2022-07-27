import { TOURNAMENT_TABLE_TBODY } from './../consts/css-selectors.js';
export function getResults(page) {
    return page
        .waitForSelector(TOURNAMENT_TABLE_TBODY, { timeout: 2000000 })
        .then(function () {
        return page.$eval(TOURNAMENT_TABLE_TBODY, function (table) {
            ///--------------------- UTIL FUNCTIONS ---------------------///
            var getCleanTxt = function (el) { var _a; return (_a = ((el === null || el === void 0 ? void 0 : el.innerText) || (el === null || el === void 0 ? void 0 : el.textContent))) === null || _a === void 0 ? void 0 : _a.trim(); };
            var parseQuote = function (str) { return (str === '-' ? -1 : +str); };
            var getDateTh = function (tr) { return tr.querySelector('th.first2.tl'); };
            var getTimeTd = function (tr) { return tr.querySelector('td.table-time'); };
            var getTeamsStr = function (tr) { return getCleanTxt(tr.querySelector('.table-participant')); };
            var getTeams = function (tr) {
                return getTeamsStr(tr)
                    .split(' - ')
                    .map(function (t) { return t.trim(); });
            };
            var getScores = function (tr) {
                var _a, _b, _c, _d;
                var scoresTd = tr.querySelector('.table-score');
                var txt = (_a = getCleanTxt(scoresTd)) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '');
                var cleanTxt = (_c = (_b = /\d+:\d+/g) === null || _b === void 0 ? void 0 : _b.exec(txt)) === null || _c === void 0 ? void 0 : _c[0];
                return ((_d = cleanTxt === null || cleanTxt === void 0 ? void 0 : cleanTxt.split(':')) === null || _d === void 0 ? void 0 : _d.map(function (s) { return +s; })) || [];
            };
            var YYYYMMdd = function (date) {
                var dd = date.getDate();
                var MM = date.getMonth() + 1;
                var YYYY = date.getFullYear();
                return [YYYY, MM, dd].join('-');
            };
            var getDateStr = function (tr) {
                var dateStr = getDateTh(tr).innerText.trim();
                var matches = /\d{2}\s[a-z|A-Z]{3}\s\d{4}/.exec(dateStr);
                if (!(matches === null || matches === void 0 ? void 0 : matches.length)) {
                    if (dateStr.startsWith('Today'))
                        return YYYYMMdd(new Date());
                    if (dateStr.startsWith('Yesterday'))
                        return YYYYMMdd(new Date(Date.now() - 24 * 60 * 60 * 1000));
                    if (dateStr.startsWith('Tomorrow'))
                        return YYYYMMdd(new Date(Date.now() + 24 * 60 * 60 * 1000));
                    console.error("caroci esti o problema, asta ii datat strana: '", dateStr + "'");
                    return;
                }
                return matches[0];
            };
            var getHourStr = function (tr) {
                var dateStr = getTimeTd(tr).innerText;
                return dateStr.trim();
            };
            ///--------------------- END UTIL FUNCTIONS ---------------------///
            var retVal = [];
            var actualDateStr;
            for (var i = 0; i < table.rows.length; i++) {
                var tr = table.rows[i];
                if (tr.classList.contains('nob-border')) {
                    actualDateStr = getDateStr(tr);
                }
                if ((tr.classList.contains('odd') || tr.classList.contains('deactivate') || tr.attributes.getNamedItem('xeid')) && (actualDateStr === null || actualDateStr === void 0 ? void 0 : actualDateStr.length)) {
                    var time = getHourStr(tr);
                    var dateTimeStr = actualDateStr + ' ' + time;
                    var date;
                    try {
                        date = new Date(dateTimeStr + ' Z').toISOString();
                        // date = YYYYMMdd(new Date(dateTimeStr)) + ' ' + time;
                    }
                    catch (error) {
                        console.error('suka bliaty sint ptoblemi...');
                        console.error('data: ' + actualDateStr, 'uara: ' + time, 'data uara: ' + dateTimeStr);
                        console.error(error);
                    }
                    var tdLEn = tr.querySelectorAll('td').length;
                    var isNext = !tr.querySelector('td.table-score');
                    var hasX = tdLEn === 7 || (tdLEn === 6 && isNext);
                    var quote1Index = isNext ? 2 : 3;
                    var quote1 = parseQuote(getCleanTxt(tr.childNodes.item(quote1Index)));
                    var quotex = hasX ? parseQuote(getCleanTxt(tr.childNodes.item(quote1Index + 1))) : undefined;
                    var quote2 = parseQuote(getCleanTxt(tr.childNodes.item(tdLEn - 2)));
                    var _a = getTeams(tr), team1 = _a[0], team2 = _a[1];
                    var _b = getScores(tr), team1Score = _b[0], team2Score = _b[1];
                    retVal.push({
                        date: date,
                        team1: team1,
                        team2: team2,
                        team1Score: team1Score,
                        team2Score: team2Score,
                        quote1: quote1,
                        quotex: quotex,
                        quote2: quote2
                    });
                    // (tr.childNodes.item(0) as HTMLElement).innerText += ' ✔️';
                    // (tr.childNodes.item(0) as HTMLElement).style.color = 'green';
                }
            }
            return retVal;
        });
    })["catch"](function (e) {
        console.error(e);
        return [];
    });
}
//# sourceMappingURL=results.js.map