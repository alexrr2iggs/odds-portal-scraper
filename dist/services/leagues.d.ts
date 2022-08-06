import { Page } from 'puppeteer';
import { Game } from '../types/sport.js';
export declare function getLeagueList(page: Page): Promise<{
    game: Game;
    country: string;
    league: string;
    url: string;
}[]>;
//# sourceMappingURL=leagues.d.ts.map