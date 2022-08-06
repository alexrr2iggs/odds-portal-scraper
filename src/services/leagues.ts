import { url } from 'inspector';
import { Page } from 'puppeteer';
import { LEAGUES_ANCHORS } from '../consts/css-selectors.js';
import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/various.js';
// import { SOCCER_LEAGUES_ANCHORS } from "../consts/css-selectors.js";
import { Game } from '../types/sport.js';

export function getLeagueList(page: Page): Promise<{game:Game; country: string, league: string; url: string }[]> {
    return page
        .waitForSelector('.table-main.sport tbody', { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
        .then(() => page.$eval('.table-main.sport tbody', (table: HTMLTableElement) => {

            ///------------------------- BEGIN UTIL FUNCTIONS ------------------------

            const games = {
                 1:'SOCCER',
                 2:'TENNIS',
                 3:'BASKETBALL',
                 4:'HOCKEY',
                 5:'AMERICAN_FOOTBALL',
                 6:'BASEBALL',
                 7:'HANDBALL',
                 8:'RUGBY_UNION',
                 9:'FLOORBALL',
                 10:'BANDY',
                 11:'FUTSAL',
                 12:'VOLLEYBALL',
                 13:'CRICKET',
                 14:'DARTS',
                 15:'SNOOKER',
                 16:'BOXING',
                 17:'BEACH_VOLLEYBALL',
                 18:'AUSSIE_RULES',
                 19:'RUGBY_LEAGUE',
                 21:'BADMINTON',
                 22:'WATER_POLO',
                 26:'BEACH_SOCCER',
                 28:'MMA',
                 30:'PESAPALLO',
                 36:'E_SPORTS',
            }


            ///------------------------- END UTIL FUNCTIONS ------------------------


            const leagues: { game:Game, country: string, league: string; url: string }[] = [];

            var country: string;
            for (let i = 0; i < table.childNodes.length; i++) {
                const row = table.childNodes.item(i) as HTMLTableRowElement;
                
                if(row.className==='dark center') continue;

                
                //game ID
                const xsid = +row.attributes.getNamedItem('xsid').value;

                // country ID
                const xcid = row.attributes.getNamedItem('xcid');

                //if its country row, update country and continue
                if (xcid) {
                    country = row.innerText.trim();
                    continue;
                }

                const leagueAnchors = row.querySelectorAll('a');

                leagueAnchors.forEach(leagueAnchor=> {
                    leagues.push({
                        game:games[xsid],
                        country,
                        league:leagueAnchor.innerText,
                        url:leagueAnchor.href,
                    })
                });


            }

            return leagues;
        }))
        .catch(e => {
            console.error(e);
            return [];
        });
}
