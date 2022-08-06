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
import { CrawlSession, SessionCreator } from "../entities/crawl-session.js";
import inquirer from 'inquirer';
import { selectSession } from "../cli/select-session.js";
import { endDateIn, startDateIn } from "../cli/date-input.js";
import { selectGames } from "../cli/select-game.js";
import { Game } from "../types/sport.js";
import { time } from "iggs-utils";
import { continueInterruptedSessions } from "../cli/continue-unfinished-sessions.js";
export function getSession(interactive, repoSession) {
    return __awaiter(this, void 0, void 0, function () {
        var interrptedSessions, session, newSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repoSession.find({
                        where: { complete: false },
                        relations: { reccords: true }
                    })];
                case 1:
                    interrptedSessions = _a.sent();
                    if (!interactive) return [3 /*break*/, 3];
                    return [4 /*yield*/, selectSessionFromInterrputed(interrptedSessions === null || interrptedSessions === void 0 ? void 0 : interrptedSessions.filter(function (s) { return s.createdBy === SessionCreator.USER; }))];
                case 2:
                    session = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    session = interrptedSessions === null || interrptedSessions === void 0 ? void 0 : interrptedSessions.filter(function (s) { return s.createdBy === SessionCreator.SYSTEM; })[0];
                    _a.label = 4;
                case 4:
                    if (!(!session && interactive)) return [3 /*break*/, 7];
                    return [4 /*yield*/, getSessionFromUser()];
                case 5:
                    newSession = _a.sent();
                    return [4 /*yield*/, repoSession.save(newSession)];
                case 6:
                    session = _a.sent();
                    _a.label = 7;
                case 7:
                    if (!(!interactive && !session)) return [3 /*break*/, 9];
                    session = new CrawlSession();
                    session.start = new Date(Date.now() - (2 * time.day)).toISOString();
                    session.end = new Date("6666-06-06").toISOString();
                    session.reccords = [];
                    session.createdBy = SessionCreator.SYSTEM;
                    session.games = [
                        // Game.CRICKET,
                        Game.SOCCER,
                        Game.BASKETBALL,
                        Game.BASEBALL,
                        Game.HOCKEY,
                        // Game.TENNIS,
                        Game.AMERICAN_FOOTBALL,
                        // Game.AUSSIE_RULES,
                        Game.BADMINTON,
                        // Game.BANDY,
                        Game.BEACH_SOCCER,
                        Game.BEACH_VOLLEYBALL,
                        // Game.BOXING,
                        Game.DARTS,
                        // Game.FLOORBALL,
                        // Game.FUTSAL,
                        Game.HANDBALL,
                        // Game.MMA,
                        Game.PESAPALLO,
                        Game.RUGBY_LEAGUE,
                        Game.RUGBY_UNION,
                        // Game.SNOOKER,
                        Game.VOLLEYBALL,
                        Game.WATER_POLO,
                        Game.E_SPORTS,
                    ];
                    return [4 /*yield*/, repoSession.save(session)];
                case 8:
                    session = _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, session];
            }
        });
    });
}
export function getSessionFromUser() {
    return __awaiter(this, void 0, void 0, function () {
        var newSession, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([startDateIn, endDateIn, selectGames])];
                case 1:
                    newSession = _a.sent();
                    session = new CrawlSession();
                    session.start = newSession.start;
                    session.end = newSession.end;
                    session.reccords = [];
                    session.games = newSession.games;
                    session.createdBy = SessionCreator.USER;
                    return [2 /*return*/, session];
            }
        });
    });
}
function selectSessionFromInterrputed(interruptedSessions) {
    return __awaiter(this, void 0, void 0, function () {
        var continueOldSession, continueOldSession, selectedSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interruptedSessions.length === 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer.prompt(continueInterruptedSessions)];
                case 1:
                    continueOldSession = _a.sent();
                    if (continueOldSession.continueInterruptedSessions)
                        return [2 /*return*/, interruptedSessions[0]];
                    _a.label = 2;
                case 2:
                    if (!(interruptedSessions.length > 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer.prompt(continueInterruptedSessions)];
                case 3:
                    continueOldSession = _a.sent();
                    if (!continueOldSession.continueInterruptedSessions) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer.prompt(selectSession(interruptedSessions))];
                case 4:
                    selectedSession = _a.sent();
                    return [2 /*return*/, selectedSession.session];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=session.js.map