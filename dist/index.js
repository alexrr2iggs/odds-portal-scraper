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
import { headlesConfirm } from './cli/headless.js';
import { NEXT_MATCH } from './consts/various.js';
import chalk from 'chalk';
import { time } from 'iggs-utils';
import inquirer from 'inquirer';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, scrapSessiontoString, SessionCreator } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { oddsDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { getLeagueList } from './services/leagues.js';
import { getPage, getTTotpagesVisited, initBrowser, navigate } from './services/puppeter.js';
import { getResults } from './services/results.js';
import { fixtureID, getMaxMinTimes } from './utils/fixture.js';
import { program } from "commander";
import { getSession } from './services/session.js';
import { writeFixtures } from './orm/fixture.js';
var BLUE_HEX = '0072CE';
var RED_HEX = 'E4181C';
var blueFg = chalk.hex(BLUE_HEX);
var redFg = chalk.hex(RED_HEX);
var blueBg = chalk.bgHex(BLUE_HEX);
var redBg = chalk.bgHex(RED_HEX);
program
    .option('-i, --intercative');
program.parse();
var options = program.opts();
var interactive = options.intercative;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ds, repoSession, repoFix, previousSessions, userSessions, syetemSessions, headless, puppeteerLaunchOptions, session, startDate, endDate, startDateTime, endDateTime, startYear, endYear, page, leagues, _loop_1, fixtures, _i, leagues_1, league, startScrapping, endScrapping;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, oddsDataSource.initialize()];
            case 1:
                ds = _e.sent();
                repoSession = ds.getRepository(CrawlSession);
                repoFix = ds.getRepository(Fixture);
                return [4 /*yield*/, repoSession.find({
                        where: { complete: false },
                        relations: { reccords: true }
                    })];
            case 2:
                previousSessions = _e.sent();
                if (previousSessions.length) {
                    userSessions = previousSessions.filter(function (s) { return s.createdBy === SessionCreator.USER; });
                    syetemSessions = previousSessions.filter(function (s) { return s.createdBy === SessionCreator.SYSTEM; });
                    console.log('user interrupted sessions:');
                    userSessions.forEach(function (ps) { return console.log(chalk.bgYellow(chalk.black(scrapSessiontoString(ps)))); });
                    console.log('\n\nsystem interrupted sessions:');
                    syetemSessions.forEach(function (ps) { return console.log(chalk.bgGray(chalk.black(scrapSessiontoString(ps)))); });
                    console.log('\n\n\n\n\n');
                }
                headless = true;
                if (!interactive) return [3 /*break*/, 4];
                return [4 /*yield*/, inquirer.prompt(headlesConfirm)];
            case 3:
                puppeteerLaunchOptions = _e.sent();
                headless = !!(puppeteerLaunchOptions === null || puppeteerLaunchOptions === void 0 ? void 0 : puppeteerLaunchOptions.headless);
                _e.label = 4;
            case 4: return [4 /*yield*/, initBrowser({
                    headless: headless,
                    defaultViewport: { height: 1080, width: 1920 }
                    // slowMo: 200
                })];
            case 5:
                _e.sent();
                return [4 /*yield*/, getSession(interactive, repoSession)];
            case 6:
                session = _e.sent();
                startDate = new Date(session.start);
                endDate = new Date(session.end);
                startDateTime = startDate.getTime();
                endDateTime = endDate.getTime();
                startYear = startDate.getFullYear();
                endYear = endDate.getFullYear();
                // const insertedLeagues = session?.reccords?.map(r => r.league);
                if (startDateTime > endDateTime) {
                    console.error('wai pula, ai baut??? data dinainiti ii mai mari ca seia dinapoi, sii cu tine???', 'start: ' + session.start, 'end: ' + session.end);
                    console.log('hai mai insiarca odat, si nu si timpit');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, getPage(LEAGUES_URL)];
            case 7:
                page = _e.sent();
                return [4 /*yield*/, getLeagueList(page)];
            case 8:
                leagues = _e.sent();
                _loop_1 = function (league) {
                    var alreadyInserted, campionati, _loop_2, _f, campionati_1, campionat, state_1, reccord, savedSession;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                if (!session.games.includes(league.game))
                                    return [2 /*return*/, "continue"];
                                alreadyInserted = (_a = session === null || session === void 0 ? void 0 : session.reccords) === null || _a === void 0 ? void 0 : _a.some(function (reccord) { return reccord.country === league.country && reccord.league === league.league && reccord.game === league.game; });
                                if (alreadyInserted)
                                    return [2 /*return*/, "continue"];
                                console.log(redFg("\uD83D\uDD0E looking for CAMPIONATI, league: ".concat(league === null || league === void 0 ? void 0 : league.league, ": ").concat(league === null || league === void 0 ? void 0 : league.url)));
                                return [4 /*yield*/, navigate(page, league.url)];
                            case 1:
                                _g.sent();
                                return [4 /*yield*/, getCampionatList(page)];
                            case 2:
                                campionati = _g.sent();
                                _loop_2 = function (campionat) {
                                    var years, campionatStartYear, campionatEndYear, lastpaPageNr, currentPageNumber, pageURL, _h, minTime, maxTime, error_1;
                                    return __generator(this, function (_j) {
                                        switch (_j.label) {
                                            case 0:
                                                if (!campionat.campionat.length)
                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                years = (_d = (_c = (_b = campionat === null || campionat === void 0 ? void 0 : campionat.campionat) === null || _b === void 0 ? void 0 : _b.match(/\d{4}/g)) === null || _c === void 0 ? void 0 : _c.map(function (y) { return +y; })) === null || _d === void 0 ? void 0 : _d.sort();
                                                campionatStartYear = years === null || years === void 0 ? void 0 : years[0];
                                                campionatEndYear = (years === null || years === void 0 ? void 0 : years[1]) || (years === null || years === void 0 ? void 0 : years[0]);
                                                if ((campionat === null || campionat === void 0 ? void 0 : campionat.campionat) !== NEXT_MATCH && (campionatStartYear < startYear || campionatEndYear > endYear))
                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                // console.log(chalk.white(campionat.url));
                                                console.log(chalk.white("\uD83D\uDD0E looking for \"LAST PAGE NR.\", campionat: ".concat(campionat === null || campionat === void 0 ? void 0 : campionat.campionat, ": ").concat(campionat === null || campionat === void 0 ? void 0 : campionat.url)));
                                                return [4 /*yield*/, navigate(page, campionat.url)];
                                            case 1:
                                                _j.sent();
                                                return [4 /*yield*/, getCampionatLastPage(page)];
                                            case 2:
                                                lastpaPageNr = _j.sent();
                                                currentPageNumber = 1;
                                                _j.label = 3;
                                            case 3:
                                                if (!(currentPageNumber <= lastpaPageNr)) return [3 /*break*/, 12];
                                                pageURL = campionat.url + '#/page/' + currentPageNumber;
                                                console.log(blueFg("\uD83D\uDD0E looking for FIXTURES: ".concat(pageURL)));
                                                return [4 /*yield*/, navigate(page, pageURL)];
                                            case 4:
                                                _j.sent();
                                                return [4 /*yield*/, getResults(page)];
                                            case 5:
                                                // await navigate(page, pageURL);
                                                fixtures = _j.sent();
                                                fixtures = fixtures === null || fixtures === void 0 ? void 0 : fixtures.filter(function (f) { return !!(f === null || f === void 0 ? void 0 : f.date); });
                                                if (!(fixtures === null || fixtures === void 0 ? void 0 : fixtures.length))
                                                    return [3 /*break*/, 11];
                                                _h = getMaxMinTimes(fixtures), minTime = _h[0], maxTime = _h[1];
                                                if (maxTime < startDateTime)
                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                if (minTime > endDateTime)
                                                    return [3 /*break*/, 11];
                                                /*
                                                // if most recent fixture of page is older than start date, go to next page
                                                if (maxTime < startDateTime) continue writePages;
                            
                                                // if oldest fixture of page is newer than end date, go to next campionat
                                                if (minTime > endDateTime) continue writeCampionati;
                                                */
                                                fixtures = fixtures.map(function (fixture) {
                                                    var fixtureEntity = new Fixture(fixture);
                                                    fixtureEntity.campionat = campionat.campionat;
                                                    fixtureEntity.league = league.league;
                                                    fixtureEntity.game = league.game;
                                                    fixtureEntity.country = league.country;
                                                    fixtureEntity.ID = fixtureID(fixtureEntity);
                                                    return fixtureEntity;
                                                });
                                                _j.label = 6;
                                            case 6:
                                                _j.trys.push([6, 9, , 11]);
                                                return [4 /*yield*/, repoFix.save(fixtures)];
                                            case 7:
                                                _j.sent();
                                                session.totInserted += fixtures.length;
                                                return [4 /*yield*/, repoSession.save(session)];
                                            case 8:
                                                _j.sent();
                                                console.log(blueBg("\uD83D\uDCDD writed on metalo baza ".concat(fixtures.length, " fixtures, campionat: ").concat(campionat.campionat, ", league: ").concat(league.league, ", game: ").concat(league.game, ", from: ").concat(new Date(minTime).toLocaleString(), ", to: ").concat(new Date(maxTime).toLocaleString(), ", page: ").concat(currentPageNumber)));
                                                return [3 /*break*/, 11];
                                            case 9:
                                                error_1 = _j.sent();
                                                console.error('error writing bulk fixtures on db, now trying to write one at a time');
                                                console.error(error_1);
                                                return [4 /*yield*/, writeFixtures(fixtures, session, repoFix, repoSession, page.url())];
                                            case 10:
                                                _j.sent();
                                                return [3 /*break*/, 11];
                                            case 11:
                                                currentPageNumber++;
                                                return [3 /*break*/, 3];
                                            case 12: return [2 /*return*/];
                                        }
                                    });
                                };
                                _f = 0, campionati_1 = campionati;
                                _g.label = 3;
                            case 3:
                                if (!(_f < campionati_1.length)) return [3 /*break*/, 6];
                                campionat = campionati_1[_f];
                                return [5 /*yield**/, _loop_2(campionat)];
                            case 4:
                                state_1 = _g.sent();
                                switch (state_1) {
                                    case "continue-writeCampionati": return [3 /*break*/, 5];
                                }
                                _g.label = 5;
                            case 5:
                                _f++;
                                return [3 /*break*/, 3];
                            case 6:
                                session.totLeagues++;
                                reccord = new CrawlSessionReccord();
                                reccord.crawlSession = session;
                                reccord.league = league.league;
                                reccord.country = league.country;
                                reccord.game = league.game;
                                return [4 /*yield*/, ds.getRepository(CrawlSessionReccord).save(reccord)];
                            case 7:
                                savedSession = _g.sent();
                                session.reccords.push(savedSession);
                                return [4 /*yield*/, repoSession.save(session)];
                            case 8:
                                _g.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, leagues_1 = leagues;
                _e.label = 9;
            case 9:
                if (!(_i < leagues_1.length)) return [3 /*break*/, 12];
                league = leagues_1[_i];
                return [5 /*yield**/, _loop_1(league)];
            case 10:
                _e.sent();
                _e.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 9];
            case 12:
                session.complete = true;
                return [4 /*yield*/, ds.getRepository(CrawlSession).save(session)];
            case 13:
                _e.sent();
                return [4 /*yield*/, ds.getRepository(CrawlSessionReccord).remove(session.reccords)];
            case 14:
                _e.sent();
                startScrapping = new Date(session.createdAt).getTime();
                endScrapping = Date.now();
                console.log(chalk.greenBright('\ngo finio, porco zio! 🥳🥳🥳\n'));
                console.log("".concat(session.totLeagues, " leagues scrapped, ").concat(session.totInserted, " fixtures scrapped, ").concat(getTTotpagesVisited(), " pages visited, in ").concat((endScrapping - startScrapping) / time.minute, " minutes"));
                process.exit();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map