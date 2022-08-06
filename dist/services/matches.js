import { MATCHES_TBODY } from '../consts/css-selectors.js';
export function getMatches(page) {
    return page
        .waitForSelector(MATCHES_TBODY, { timeout: 2000000 })
        .then(function () {
        return page.$eval(MATCHES_TBODY, function (table) {
            //taking the date as a string from page path, format: /matches/ 2020-01-01
            var path = window.location.pathname.split('/');
            var datestr = path[path.length - 2];
            var dateStrFormatted = datestr.substring(0, 4) + '-' + datestr.substring(4, 6) + '-' + datestr.substring(6, 8);
            var retVal = [];
            var parseQuote = function (str) { return (str === '-' ? -1 : +str); };
            var getCleanTxt = function (el) { return el.textContent.trim(); };
            var getTimeTd = function (tr) { return tr.querySelector('td.table-time'); };
            var getLeague = function (tr) { return tr.querySelector('td.table-time'); };
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
                var qoteTxt = tr.querySelectorAll('td').item(4);
                if (items.length === 6)
                    return;
                return parseQuote(getCleanTxt(qoteTxt));
            };
            var getQuote2 = function (tr) {
                var items = tr.querySelectorAll('td');
                return parseQuote(getCleanTxt(items.item(items.length - 2)));
            };
            var YYYYMMdd = function (date) {
                var dd = date.getDate();
                var MM = date.getMonth() + 1;
                var YYYY = date.getFullYear();
                return [YYYY, MM, dd].join('-');
            };
            var getHourStr = function (tr) {
                var dateStr = getTimeTd(tr).innerText;
                return dateStr.trim();
            };
            var league;
            var campionat;
            for (var i = 0; i < table.rows.length; i++) {
                var tr = table.rows[i];
                if (tr.className === 'dark center') {
                    continue;
                }
                if (tr.classList.contains('deactivate')) {
                    var time = getHourStr(tr);
                    var dateTimeStr = dateStrFormatted + ' ' + time;
                    var date;
                    try {
                        date = new Date(dateTimeStr).toISOString();
                    }
                    catch (error) {
                        console.error('date parsing error, future mathes...');
                        console.error('date: ' + dateStrFormatted, 'time: ' + time, 'date time: ' + dateTimeStr);
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
        return Promise.reject(e);
    });
}
//# sourceMappingURL=matches.js.map