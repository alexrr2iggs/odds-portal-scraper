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
import { endDateIn, startDateIn } from './cli/date-input.js';
import { headlesConfirm } from './cli/headless.js';
import { NEXT_MATCH } from './consts/various.js';
// const { Command } = require('commander');
import chalk from 'chalk';
import { time } from 'iggs-utils';
import inquirer from 'inquirer';
import { continueInterruptedSession, continueInterruptedSessions } from './cli/continue-unfinished-sessions.js';
import { selectGames } from './cli/select-game.js';
import { selectSession } from './cli/select-session.js';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, scrapSessiontoString } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { appDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { writeError } from './services/error.js';
import { getLeagueList } from './services/league.js';
import { getPage, getTTotpagesVisited, initBrowser, navigate } from './services/puppeter.js';
import { getResults } from './services/results.js';
import { getMaxMinTimes } from './utils/fixture.js';
var BLUE_HEX = '0072CE';
var RED_HEX = 'E4181C';
var blueFg = chalk.hex(BLUE_HEX);
var redFg = chalk.hex(RED_HEX);
var blueBg = chalk.bgHex(BLUE_HEX);
var redBg = chalk.bgHex(RED_HEX);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ds, repoSession, repoFix, session, previousSessions, puppeteerLaunchOptions, continueOldSession, continueOldSession, selectedSession, newSession, startDate, endDate, startDateTime, endDateTime, startYear, endYear, insertedLeagues, startScrapping, _loop_1, fixtures, _i, _a, game, endScrapping;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, appDataSource.initialize()];
            case 1:
                ds = _f.sent();
                repoSession = ds.getRepository(CrawlSession);
                repoFix = ds.getRepository(Fixture);
                return [4 /*yield*/, repoSession.find({
                        relations: { reccords: true }
                    })];
            case 2:
                previousSessions = _f.sent();
                if (previousSessions.length) {
                    console.log('interrupted sessions:\n\n');
                    previousSessions.forEach(function (ps) { return console.log(chalk.bgWhite(chalk.black(scrapSessiontoString(ps)))); });
                    console.log('\n\n\n\n\n');
                }
                return [4 /*yield*/, inquirer.prompt(headlesConfirm)];
            case 3:
                puppeteerLaunchOptions = _f.sent();
                return [4 /*yield*/, initBrowser(__assign(__assign({}, puppeteerLaunchOptions), { defaultViewport: { height: 1080, width: 1920 } }))];
            case 4:
                _f.sent();
                if (!(previousSessions.length === 1)) return [3 /*break*/, 6];
                return [4 /*yield*/, inquirer.prompt(continueInterruptedSession)];
            case 5:
                continueOldSession = _f.sent();
                if (continueOldSession.continueInterruptedSession)
                    session = previousSessions[0];
                _f.label = 6;
            case 6:
                if (!(previousSessions.length > 1)) return [3 /*break*/, 9];
                return [4 /*yield*/, inquirer.prompt(continueInterruptedSessions)];
            case 7:
                continueOldSession = _f.sent();
                if (!continueOldSession.continueInterruptedSessions) return [3 /*break*/, 9];
                return [4 /*yield*/, inquirer.prompt(selectSession(previousSessions))];
            case 8:
                selectedSession = _f.sent();
                session = selectedSession.session;
                _f.label = 9;
            case 9:
                if (!!session) return [3 /*break*/, 12];
                return [4 /*yield*/, inquirer.prompt([startDateIn, endDateIn, selectGames])];
            case 10:
                newSession = _f.sent();
                session = new CrawlSession();
                session.start = newSession.start;
                session.end = newSession.end;
                session.reccords = [];
                session.games = newSession.games;
                return [4 /*yield*/, ds.getRepository(CrawlSession).save(session)];
            case 11:
                session = _f.sent();
                _f.label = 12;
            case 12:
                startDate = new Date(session.start);
                endDate = new Date(session.end);
                startDateTime = startDate.getTime();
                endDateTime = endDate.getTime();
                startYear = startDate.getFullYear();
                endYear = endDate.getFullYear();
                insertedLeagues = (_b = session === null || session === void 0 ? void 0 : session.reccords) === null || _b === void 0 ? void 0 : _b.map(function (r) { return r.league; });
                if (startDateTime > endDateTime) {
                    console.error('wai pula, ai baut??? data dinainiti ii mai mari ca seia dinapoi, sii cu tine???', 'start: ' + session.start, 'end: ' + session.end);
                    console.log('hai mai insiarca odat, si nu si timpit');
                    return [2 /*return*/];
                }
                startScrapping = Date.now();
                _loop_1 = function (game) {
                    var page, leagues, _loop_2, _g, leagues_1, league;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                console.log(redFg("\uD83D\uDD0E looking for LEAGUES, game: ".concat(game, ": ").concat(LEAGUES_URL[game])));
                                return [4 /*yield*/, getPage(LEAGUES_URL[game])];
                            case 1:
                                page = _h.sent();
                                return [4 /*yield*/, getLeagueList(page, game)];
                            case 2:
                                leagues = _h.sent();
                                _loop_2 = function (league) {
                                    var campionati, _loop_3, _j, campionati_1, campionat, state_1, reccord;
                                    return __generator(this, function (_k) {
                                        switch (_k.label) {
                                            case 0:
                                                if (insertedLeagues === null || insertedLeagues === void 0 ? void 0 : insertedLeagues.includes(league.league))
                                                    return [2 /*return*/, "continue"];
                                                return [4 /*yield*/, navigate(page, league.url)];
                                            case 1:
                                                _k.sent();
                                                console.log(redFg("\uD83D\uDD0E looking for CAMPIONATI, league: ".concat(league === null || league === void 0 ? void 0 : league.league, ": ").concat(league === null || league === void 0 ? void 0 : league.url)));
                                                return [4 /*yield*/, getCampionatList(page)];
                                            case 2:
                                                campionati = _k.sent();
                                                _loop_3 = function (campionat) {
                                                    var years, campionatStartYear, campionatEndYear, lastpaPageNr, currentPageNumber, pageURL, _l, minTime, maxTime, error_1;
                                                    return __generator(this, function (_m) {
                                                        switch (_m.label) {
                                                            case 0:
                                                                if (!campionat.campionat.length)
                                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                                years = (_e = (_d = (_c = campionat === null || campionat === void 0 ? void 0 : campionat.campionat) === null || _c === void 0 ? void 0 : _c.match(/\d{4}/g)) === null || _d === void 0 ? void 0 : _d.map(function (y) { return +y; })) === null || _e === void 0 ? void 0 : _e.sort();
                                                                campionatStartYear = years === null || years === void 0 ? void 0 : years[0];
                                                                campionatEndYear = (years === null || years === void 0 ? void 0 : years[1]) || (years === null || years === void 0 ? void 0 : years[0]);
                                                                if ((campionat === null || campionat === void 0 ? void 0 : campionat.campionat) !== NEXT_MATCH && (campionatStartYear < startYear || campionatEndYear > endYear))
                                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                                // console.log(chalk.white(campionat.url));
                                                                console.log(chalk.white("\uD83D\uDD0E looking for \"LAST PAGE NR.\", campionat: ".concat(campionat === null || campionat === void 0 ? void 0 : campionat.campionat, ": ").concat(campionat === null || campionat === void 0 ? void 0 : campionat.url)));
                                                                return [4 /*yield*/, navigate(page, campionat.url)];
                                                            case 1:
                                                                _m.sent();
                                                                return [4 /*yield*/, getCampionatLastPage(page)];
                                                            case 2:
                                                                lastpaPageNr = _m.sent();
                                                                currentPageNumber = lastpaPageNr;
                                                                _m.label = 3;
                                                            case 3:
                                                                if (!(currentPageNumber > 0)) return [3 /*break*/, 11];
                                                                pageURL = campionat.url + '#/page/' + currentPageNumber;
                                                                console.log(blueFg("\uD83D\uDD0E looking for FIXTURES: ".concat(pageURL)));
                                                                return [4 /*yield*/, navigate(page, pageURL)];
                                                            case 4:
                                                                _m.sent();
                                                                return [4 /*yield*/, getResults(page)];
                                                            case 5:
                                                                // await navigate(page, pageURL);
                                                                fixtures = _m.sent();
                                                                fixtures = fixtures === null || fixtures === void 0 ? void 0 : fixtures.filter(function (f) { return !!(f === null || f === void 0 ? void 0 : f.date); });
                                                                if (!(fixtures === null || fixtures === void 0 ? void 0 : fixtures.length))
                                                                    return [3 /*break*/, 10];
                                                                _l = getMaxMinTimes(fixtures), minTime = _l[0], maxTime = _l[1];
                                                                // if most recent fixture of page is older than start date, go to next page
                                                                if (maxTime < startDateTime)
                                                                    return [3 /*break*/, 10];
                                                                // if oldest fixture of page is newer than end date, go to next campionat
                                                                if (minTime > endDateTime)
                                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                                fixtures = fixtures.map(function (fixture) {
                                                                    var fixtureEntity = new Fixture(fixture);
                                                                    fixtureEntity.campionat = campionat.campionat;
                                                                    fixtureEntity.league = league.league;
                                                                    fixtureEntity.game = game;
                                                                    return fixtureEntity;
                                                                });
                                                                _m.label = 6;
                                                            case 6:
                                                                _m.trys.push([6, 9, , 10]);
                                                                return [4 /*yield*/, repoFix.save(fixtures)];
                                                            case 7:
                                                                _m.sent();
                                                                session.totInserted += fixtures.length;
                                                                return [4 /*yield*/, repoSession.save(session)];
                                                            case 8:
                                                                _m.sent();
                                                                console.log(blueBg("\uD83D\uDCDD writed on metalo baza ".concat(fixtures.length, " fixtures, campionat: ").concat(campionat.campionat, ", league: ").concat(league.league, ", game: ").concat(game, ", from: ").concat(new Date(minTime).toLocaleString(), ", to: ").concat(new Date(maxTime).toLocaleString(), ", page: ").concat(currentPageNumber)));
                                                                return [3 /*break*/, 10];
                                                            case 9:
                                                                error_1 = _m.sent();
                                                                console.error(error_1);
                                                                writeError(error_1, fixtures, pageURL);
                                                                return [3 /*break*/, 10];
                                                            case 10:
                                                                currentPageNumber--;
                                                                return [3 /*break*/, 3];
                                                            case 11: return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                _j = 0, campionati_1 = campionati;
                                                _k.label = 3;
                                            case 3:
                                                if (!(_j < campionati_1.length)) return [3 /*break*/, 6];
                                                campionat = campionati_1[_j];
                                                return [5 /*yield**/, _loop_3(campionat)];
                                            case 4:
                                                state_1 = _k.sent();
                                                switch (state_1) {
                                                    case "continue-writeCampionati": return [3 /*break*/, 5];
                                                }
                                                _k.label = 5;
                                            case 5:
                                                _j++;
                                                return [3 /*break*/, 3];
                                            case 6:
                                                session.totLeagues++;
                                                reccord = new CrawlSessionReccord();
                                                reccord.crawlSession = session;
                                                reccord.league = league.league;
                                                session.reccords.push(reccord);
                                                return [4 /*yield*/, ds.getRepository(CrawlSessionReccord).save(reccord)];
                                            case 7:
                                                _k.sent();
                                                return [4 /*yield*/, repoSession.save(session)];
                                            case 8:
                                                _k.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                _g = 0, leagues_1 = leagues;
                                _h.label = 3;
                            case 3:
                                if (!(_g < leagues_1.length)) return [3 /*break*/, 6];
                                league = leagues_1[_g];
                                return [5 /*yield**/, _loop_2(league)];
                            case 4:
                                _h.sent();
                                _h.label = 5;
                            case 5:
                                _g++;
                                return [3 /*break*/, 3];
                            case 6: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, _a = session.games;
                _f.label = 13;
            case 13:
                if (!(_i < _a.length)) return [3 /*break*/, 16];
                game = _a[_i];
                return [5 /*yield**/, _loop_1(game)];
            case 14:
                _f.sent();
                _f.label = 15;
            case 15:
                _i++;
                return [3 /*break*/, 13];
            case 16: return [4 /*yield*/, ds.getRepository(CrawlSession).remove(session)];
            case 17:
                _f.sent();
                endScrapping = Date.now();
                console.log(chalk.greenBright('\ngo finio, porco zio! 🥳🥳🥳\n'));
                console.log("".concat(session.totLeagues, " leagues scrapped, ").concat(session.totInserted, " fixtures scrapped, ").concat(getTTotpagesVisited(), " pages visited, in ").concat((endScrapping - startScrapping) / time.minute, " minutes"));
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map