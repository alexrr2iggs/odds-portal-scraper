import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/various.js';
export function getLeagueList(page) {
    return page
        .waitForSelector('.table-main.sport tbody', { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
        .then(function () { return page.$eval('.table-main.sport tbody', function (table) {
        ///------------------------- BEGIN UTIL FUNCTIONS ------------------------
        var games = {
            1: 'SOCCER',
            2: 'TENNIS',
            3: 'BASKETBALL',
            4: 'HOCKEY',
            5: 'AMERICAN_FOOTBALL',
            6: 'BASEBALL',
            7: 'HANDBALL',
            8: 'RUGBY_UNION',
            9: 'FLOORBALL',
            10: 'BANDY',
            11: 'FUTSAL',
            12: 'VOLLEYBALL',
            13: 'CRICKET',
            14: 'DARTS',
            15: 'SNOOKER',
            16: 'BOXING',
            17: 'BEACH_VOLLEYBALL',
            18: 'AUSSIE_RULES',
            19: 'RUGBY_LEAGUE',
            21: 'BADMINTON',
            22: 'WATER_POLO',
            26: 'BEACH_SOCCER',
            28: 'MMA',
            30: 'PESAPALLO',
            36: 'E_SPORTS'
        };
        ///------------------------- END UTIL FUNCTIONS ------------------------
        var leagues = [];
        var country;
        var _loop_1 = function (i) {
            var row = table.childNodes.item(i);
            if (row.className === 'dark center')
                return "continue";
            //game ID
            var xsid = +row.attributes.getNamedItem('xsid').value;
            // country ID
            var xcid = row.attributes.getNamedItem('xcid');
            //if its country row, update country and continue
            if (xcid) {
                country = row.innerText.trim();
                return "continue";
            }
            var leagueAnchors = row.querySelectorAll('a');
            leagueAnchors.forEach(function (leagueAnchor) {
                leagues.push({
                    game: games[xsid],
                    country: country,
                    league: leagueAnchor.innerText,
                    url: leagueAnchor.href
                });
            });
        };
        for (var i = 0; i < table.childNodes.length; i++) {
            _loop_1(i);
        }
        return leagues;
    }); })["catch"](function (e) {
        console.error(e);
        return [];
    });
}
//# sourceMappingURL=leagues.js.map