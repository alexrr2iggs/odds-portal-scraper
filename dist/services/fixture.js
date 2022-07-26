import { SOCCER_CAMPIONAT_TBODY } from '../consts/css-selectors.js';
export function getFixtures(page) {
    return page
        .waitForSelector(SOCCER_CAMPIONAT_TBODY, { timeout: 2000000 })
        .then(function () {
        return page.$eval(SOCCER_CAMPIONAT_TBODY, function (table) {
            var retVal = [];
            var parseQuote = function (str) { return (str === '-' ? -1 : +str); };
            var getCleanTxt = function (el) { return el.textContent.trim(); };
            var getDateTh = function (tr) { return tr.querySelector('th.first2.tl'); };
            var getTimeTd = function (tr) { return tr.querySelector('td.table-time'); };
            var getTeamsStr = function (tr) { return tr.querySelector('.table-participant').textContent; };
            var getTeams = function (tr) {
                return getTeamsStr(tr)
                    .split(' - ')
                    .map(function (t) { return t.trim(); });
            };
            var getScores = function (tr) {
                var _a, _b;
                var txt = tr.querySelector('.table-score').textContent.replace(/\s/g, '');
                var cleanTxt = (_a = /\d+:\d+/g.exec(txt)) === null || _a === void 0 ? void 0 : _a[0];
                return ((_b = cleanTxt === null || cleanTxt === void 0 ? void 0 : cleanTxt.split(':')) === null || _b === void 0 ? void 0 : _b.map(function (s) { return +s; })) || [];
            };
            var getQuote1 = function (tr) { return parseQuote(getCleanTxt(tr.querySelectorAll('td').item(3))); };
            var getQuotex = function (tr) {
                var items = tr.querySelectorAll('td');
                if (items.length === 7) {
                    //return +items.item(4).innerText.trim();
                    return parseQuote(getCleanTxt(tr.querySelectorAll('td').item(4)));
                }
            };
            var getQuote2 = function (tr) {
                var items = tr.querySelectorAll('td');
                return parseQuote(getCleanTxt(items.item(items.length - 2)));
            };
            var YYYYMMdd = function (date) {
                var now = new Date();
                var dd = now.getDate();
                var MM = now.getMonth() + 1;
                var YYYY = now.getFullYear();
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
                    console.error("caroci esti o problema, asta ii datat strana: '", dateStr + "'");
                    return;
                }
                return matches[0];
            };
            var getHourStr = function (tr) {
                var dateStr = getTimeTd(tr).innerText;
                return dateStr.trim();
            };
            var actualDateStr;
            for (var i = 0; i < table.rows.length; i++) {
                var tr = table.rows[i];
                if (tr.classList.contains('nob-border')) {
                    actualDateStr = getDateStr(tr);
                }
                if (tr.classList.contains('deactivate') && (actualDateStr === null || actualDateStr === void 0 ? void 0 : actualDateStr.length)) {
                    var time = getHourStr(tr);
                    var dateTimeStr = actualDateStr + ' ' + time;
                    var date;
                    try {
                        date = new Date(dateTimeStr).toISOString();
                    }
                    catch (error) {
                        console.error('suka bliaty sint ptoblemi...');
                        console.error('data: ' + actualDateStr, 'uara: ' + time, 'data uara: ' + dateTimeStr);
                        console.error(error);
                    }
                    var _a = getTeams(tr), team1 = _a[0], team2 = _a[1];
                    var _b = getScores(tr), team1Score = _b[0], team2Score = _b[1];
                    retVal.push({
                        date: date,
                        team1: team1,
                        team2: team2,
                        team1Score: team1Score,
                        team2Score: team2Score,
                        quote1: getQuote1(tr),
                        quotex: getQuotex(tr),
                        quote2: getQuote2(tr)
                    });
                }
            }
            return retVal;
        });
    })["catch"](function (e) {
        console.error(e);
        return [];
    });
}
//# sourceMappingURL=fixture.js.map