import { Page } from 'puppeteer';
import { Game } from '../types/sport.js';
export declare function getLeagueList(page: Page, game: Game): Promise<{
    league: string;
    url: string;
}[]>;
//# sourceMappingURL=league.d.ts.map