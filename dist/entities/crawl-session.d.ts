import { Game } from "../types/sport.js";
import { CrawlSessionReccord } from "./crawl-session-reccord.js";
export declare class CrawlSession {
    ID?: number;
    reccords?: CrawlSessionReccord[];
    game?: Game;
    start?: string;
    end?: string;
    totInserted?: number;
    totLeagues?: number;
    createdAt?: number;
    updatedAt?: string;
}
export declare function crawlSessiontoString(cs: CrawlSession): string;
//# sourceMappingURL=crawl-session.d.ts.map