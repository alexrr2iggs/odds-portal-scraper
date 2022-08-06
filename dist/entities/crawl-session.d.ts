import { Game } from '../types/sport.js';
import { CrawlSessionReccord } from './crawl-session-reccord.js';
export declare enum SessionCreator {
    SYSTEM = "SYSTEM",
    USER = "USER"
}
export declare class CrawlSession {
    ID?: number;
    reccords?: CrawlSessionReccord[];
    games?: Game[];
    start?: string;
    end?: string;
    totInserted?: number;
    totLeagues?: number;
    createdBy: SessionCreator;
    complete: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export declare function scrapSessiontoString(cs: CrawlSession): string;
//# sourceMappingURL=crawl-session.d.ts.map