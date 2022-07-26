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
// const { Command } = require('commander');
import chalk from 'chalk';
import inquirer from 'inquirer';
import { continueInterruptedSession, continueInterruptedSessions } from './cli/continue-unfinished-sessions.js';
import { selectGame } from './cli/select-game.js';
import { selectSession } from './cli/select-session.js';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, scrapSessiontoString } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { appDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { writeError } from './services/error.js';
import { getFixtures } from './services/fixture.js';
import { getLeagueList } from './services/league.js';
import { getPage, goto, initBrowser } from './services/puppeter.js';
import { getMaxMinTimes } from './utils/fixture.js';
var blue = chalk.hex('054ef7');
var red = chalk.hex('E4181C');
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ds, repoSession, repoFix, session, previousSessions, puppeteerLaunchOptions, continueOldSession, continueOldSession, selectedSession, newSession, startDate, endDate, startDateTime, endDateTime, startYear, endYear, insertedLeagues, page, leagues, _loop_1, fixtures, _i, leagues_1, league;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, appDataSource.initialize()];
            case 1:
                ds = _e.sent();
                repoSession = ds.getRepository(CrawlSession);
                repoFix = ds.getRepository(Fixture);
                return [4 /*yield*/, repoSession.find({
                        relations: { reccords: true }
                    })];
            case 2:
                previousSessions = _e.sent();
                if (previousSessions.length) {
                    console.log('interrupted sessions:\n\n');
                    previousSessions.forEach(function (ps) { return console.log(chalk.bgWhite(chalk.black(scrapSessiontoString(ps)))); });
                    console.log('\n\n\n\n\n');
                }
                return [4 /*yield*/, inquirer.prompt(headlesConfirm)];
            case 3:
                puppeteerLaunchOptions = _e.sent();
                initBrowser(__assign(__assign({}, puppeteerLaunchOptions), { defaultViewport: { height: 1080, width: 1920 } }));
                if (!(previousSessions.length === 1)) return [3 /*break*/, 5];
                return [4 /*yield*/, inquirer.prompt(continueInterruptedSession)];
            case 4:
                continueOldSession = _e.sent();
                if (continueOldSession.continueInterruptedSession)
                    session = previousSessions[0];
                _e.label = 5;
            case 5:
                if (!(previousSessions.length > 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, inquirer.prompt(continueInterruptedSessions)];
            case 6:
                continueOldSession = _e.sent();
                if (!continueOldSession.continueInterruptedSessions) return [3 /*break*/, 8];
                return [4 /*yield*/, inquirer.prompt(selectSession(previousSessions))];
            case 7:
                selectedSession = _e.sent();
                session = selectedSession.session;
                _e.label = 8;
            case 8:
                if (!!session) return [3 /*break*/, 11];
                return [4 /*yield*/, inquirer.prompt([startDateIn, endDateIn, selectGame])];
            case 9:
                newSession = _e.sent();
                session = new CrawlSession();
                session.start = newSession.start;
                session.end = newSession.end;
                session.reccords = [];
                session.game = newSession.game;
                return [4 /*yield*/, ds.getRepository(CrawlSession).save(session)];
            case 10:
                session = _e.sent();
                _e.label = 11;
            case 11:
                startDate = new Date(session.start);
                endDate = new Date(session.end);
                startDateTime = startDate.getTime();
                endDateTime = endDate.getTime();
                startYear = startDate.getFullYear();
                endYear = endDate.getFullYear();
                insertedLeagues = (_a = session === null || session === void 0 ? void 0 : session.reccords) === null || _a === void 0 ? void 0 : _a.map(function (r) { return r.league; });
                if (startDateTime > endDateTime) {
                    console.error('wai pula, ai baut??? data dinainiti ii mai mari ca seia dinapoi, sii cu tine???', 'start: ' + session.start, 'end: ' + session.end);
                    console.log('hai mai insiarca odat, si nu si timpit');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, getPage(LEAGUES_URL[session.game])];
            case 12:
                page = _e.sent();
                return [4 /*yield*/, getLeagueList(page, session.game)];
            case 13:
                leagues = _e.sent();
                _loop_1 = function (league) {
                    var campionati, _loop_2, _f, campionati_1, campionat, state_1, reccord;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                if (insertedLeagues === null || insertedLeagues === void 0 ? void 0 : insertedLeagues.includes(league.league))
                                    return [2 /*return*/, "continue"];
                                console.log(red(league.url));
                                return [4 /*yield*/, goto(page, league.url)];
                            case 1:
                                _g.sent();
                                return [4 /*yield*/, getCampionatList(page)];
                            case 2:
                                campionati = _g.sent();
                                _loop_2 = function (campionat) {
                                    var years, campionatStartYear, campionatEndYear, lastpaPageNr, currentPageNumber, URL_1, error_1, _h, minTime, maxTime;
                                    return __generator(this, function (_j) {
                                        switch (_j.label) {
                                            case 0:
                                                if (!campionat.campionat.length)
                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                years = (_d = (_c = (_b = campionat === null || campionat === void 0 ? void 0 : campionat.campionat) === null || _b === void 0 ? void 0 : _b.match(/\d{4}/g)) === null || _c === void 0 ? void 0 : _c.map(function (y) { return +y; })) === null || _d === void 0 ? void 0 : _d.sort();
                                                campionatStartYear = years[0];
                                                campionatEndYear = years[1] || years[0];
                                                if (campionatStartYear < startYear || campionatEndYear > endYear)
                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                console.log(chalk.white(campionat.url));
                                                return [4 /*yield*/, goto(page, campionat.url)];
                                            case 1:
                                                _j.sent();
                                                return [4 /*yield*/, getCampionatLastPage(page)];
                                            case 2:
                                                lastpaPageNr = _j.sent();
                                                currentPageNumber = lastpaPageNr;
                                                _j.label = 3;
                                            case 3:
                                                if (!(currentPageNumber > 0)) return [3 /*break*/, 12];
                                                URL_1 = campionat.url + '#/page/' + currentPageNumber;
                                                console.log(blue(URL_1));
                                                return [4 /*yield*/, goto(page, URL_1)];
                                            case 4:
                                                _j.sent();
                                                return [4 /*yield*/, getFixtures(page)];
                                            case 5:
                                                fixtures = _j.sent();
                                                fixtures = fixtures === null || fixtures === void 0 ? void 0 : fixtures.filter(function (f) { return !!(f === null || f === void 0 ? void 0 : f.date); });
                                                if (!(fixtures === null || fixtures === void 0 ? void 0 : fixtures.length))
                                                    return [3 /*break*/, 11];
                                                fixtures = fixtures.map(function (fixture) {
                                                    var fixtureEntity = new Fixture(fixture);
                                                    fixtureEntity.campionat = campionat.campionat;
                                                    fixtureEntity.league = league.league;
                                                    fixtureEntity.game = session.game;
                                                    return fixtureEntity;
                                                });
                                                _j.label = 6;
                                            case 6:
                                                _j.trys.push([6, 9, , 10]);
                                                return [4 /*yield*/, repoFix.save(fixtures)];
                                            case 7:
                                                _j.sent();
                                                session.totInserted += fixtures.length;
                                                return [4 /*yield*/, repoSession.save(session)];
                                            case 8:
                                                _j.sent();
                                                return [3 /*break*/, 10];
                                            case 9:
                                                error_1 = _j.sent();
                                                console.error(error_1);
                                                writeError(error_1, fixtures, URL_1);
                                                return [3 /*break*/, 10];
                                            case 10:
                                                _h = getMaxMinTimes(fixtures), minTime = _h[0], maxTime = _h[1];
                                                if (minTime < startDateTime)
                                                    return [2 /*return*/, "continue-writeCampionati"];
                                                if (maxTime > endDateTime)
                                                    return [3 /*break*/, 11];
                                                _j.label = 11;
                                            case 11:
                                                currentPageNumber--;
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
                                session.reccords.push(reccord);
                                return [4 /*yield*/, ds.getRepository(CrawlSessionReccord).save(reccord)];
                            case 7:
                                _g.sent();
                                return [4 /*yield*/, repoSession.save(session)];
                            case 8:
                                _g.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, leagues_1 = leagues;
                _e.label = 14;
            case 14:
                if (!(_i < leagues_1.length)) return [3 /*break*/, 17];
                league = leagues_1[_i];
                return [5 /*yield**/, _loop_1(league)];
            case 15:
                _e.sent();
                _e.label = 16;
            case 16:
                _i++;
                return [3 /*break*/, 14];
            case 17:
                console.log(chalk.greenBright('wai, so terminat!'));
                return [4 /*yield*/, ds.getRepository(CrawlSession).remove(session)];
            case 18:
                _e.sent();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map