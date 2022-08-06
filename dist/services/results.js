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
import { WHAIT_FOR_ELEMENT_TIMEOUT } from '../consts/various.js';
import { TOURNAMENT_TABLE_TBODY } from './../consts/css-selectors.js';
// export async function  getResults(resultsPage: Page): Promise<Fixture[]> {
// 	return resultsPage
// 		.waitForSelector(TOURNAMENT_TABLE_TBODY, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })
// 		.then(() =>
// 			resultsPage.$eval(TOURNAMENT_TABLE_TBODY, (table: HTMLTableElement) => {
// 				try {
// 					console.log('this',this);
// 					//@ts-ignore
// 					document.page.showHiddenEvents();
// 				} catch (error) {
// 					console.error(error);
// 				}
// 				///--------------------- UTIL FUNCTIONS ---------------------///
// 				const getCleanTxt = (el: HTMLElement) => (el?.innerText || el?.textContent)?.trim();
// 				const parseQuote = (str: string) => (str === '-' ? -1 : +str);
// 				const getDateTh = (tr: HTMLTableRowElement) => tr.querySelector('th.first2.tl') as HTMLTableCellElement;
// 				const getTimeTd = (tr: HTMLTableRowElement) => tr.querySelector('td.table-time') as HTMLTableCellElement;
// 				const getTeamsStr = (tr: HTMLTableRowElement) => getCleanTxt(tr.querySelector('.table-participant'));
// 				const getTeams = (tr: HTMLTableRowElement) =>
// 					getTeamsStr(tr)
// 						.split(' - ')
// 						.map(t => t.trim());
// 				const getScores = (tr: HTMLTableRowElement) => {
// 					const scoresTd = tr.querySelector('.table-score');
// 					const txt = getCleanTxt(scoresTd as HTMLElement)?.replace(/\s/g, '');
// 					const cleanTxt = /\d+:\d+/g?.exec(txt)?.[0];
// 					return cleanTxt?.split(':')?.map(s => +s) || [];
// 				};
// 				const YYYYMMdd = (date: Date) => {
// 					const dd = date.getDate();
// 					const MM = date.getMonth() + 1;
// 					const YYYY = date.getFullYear();
// 					return [YYYY, MM, dd].join('-');
// 				};
// 				const getDateStr = (tr: HTMLTableRowElement) => {
// 					var dateStr = getDateTh(tr).innerText.trim();
// 					const matches = /\d{2}\s[a-z|A-Z]{3}\s\d{4}/.exec(dateStr);
// 					if (!matches?.length) {
// 						if (dateStr.startsWith('Today')) return YYYYMMdd(new Date());
// 						if (dateStr.startsWith('Yesterday')) return YYYYMMdd(new Date(Date.now() - 24 * 60 * 60 * 1000));
// 						if (dateStr.startsWith('Tomorrow')) return YYYYMMdd(new Date(Date.now() + 24 * 60 * 60 * 1000));
// 						console.error("caroci esti o problema, asta ii datat strana: '", dateStr + "'");
// 						return;
// 					}
// 					return matches[0];
// 				};
// 				const getHourStr = (tr: HTMLTableRowElement) => {
// 					var dateStr = getTimeTd(tr).innerText;
// 					return dateStr.trim();
// 				};
// 				///--------------------- END UTIL FUNCTIONS ---------------------///
// 				const retVal: Fixture[] = [];
// 				let actualDateStr: string;
// 				for (var i = 0; i < table.rows.length; i++) {
// 					const tr = table.rows[i];
// 					if (tr.classList.contains('nob-border')) {
// 						actualDateStr = getDateStr(tr);
// 					}
// 					if ((tr.classList.contains('odd') || tr.classList.contains('deactivate') || tr.attributes.getNamedItem('xeid')) && actualDateStr?.length) {
// 						const time = getHourStr(tr);
// 						const dateTimeStr = actualDateStr + ' ' + time;
// 						var date: string;
// 						try {
// 							date = new Date(dateTimeStr + ' Z').toISOString();
// 							// date = YYYYMMdd(new Date(dateTimeStr)) + ' ' + time;
// 						} catch (error) {
// 							console.error('suka bliaty sint ptoblemi...');
// 							console.error('data: ' + actualDateStr, 'uara: ' + time, 'data uara: ' + dateTimeStr);
// 							console.error(error);
// 						}
// 						const tdLEn = tr.querySelectorAll('td').length;
// 						const isNext = !tr.querySelector('td.table-score');
// 						const hasX = tdLEn === 7 || (tdLEn === 6 && isNext);
// 						var quote1Index = isNext ? 2 : 3;
// 						const quote1 = parseQuote(getCleanTxt(tr.childNodes.item(quote1Index) as HTMLTableCellElement));
// 						const quotex = hasX ? parseQuote(getCleanTxt(tr.childNodes.item(quote1Index + 1) as HTMLTableCellElement)) : undefined;
// 						const quote2 = parseQuote(getCleanTxt(tr.childNodes.item(tdLEn - 2) as HTMLTableCellElement));
// 						const [team1, team2] = getTeams(tr);
// 						const [team1Score, team2Score] = getScores(tr);
// 						retVal.push({
// 							date,
// 							team1,
// 							team2,
// 							team1Score,
// 							team2Score,
// 							quote1,
// 							quotex,
// 							quote2
// 						} as any);
// 						// (tr.childNodes.item(0) as HTMLElement).innerText += ' ✔️';
// 						// (tr.childNodes.item(0) as HTMLElement).style.color = 'green';
// 					}
// 				}
// 				return retVal;
// 			})
// 		)
// 		.catch(e => {
// 			console.error(e);
// 			return [];
// 		});
// }
export function getResults(resultsPage) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resultsPage.waitForSelector(TOURNAMENT_TABLE_TBODY, { timeout: WHAIT_FOR_ELEMENT_TIMEOUT })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, resultsPage.evaluate(function () {
                            try {
                                //@ts-ignore
                                page.showHiddenEvents();
                            }
                            catch (error) {
                                console.error(error);
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, resultsPage.$eval(TOURNAMENT_TABLE_TBODY, function (table) {
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
                        })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=results.js.map