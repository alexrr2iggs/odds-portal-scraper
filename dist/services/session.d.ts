import { Repository } from "typeorm";
import { CrawlSession } from "../entities/crawl-session.js";
export declare function getSession(interactive: boolean, repoSession: Repository<CrawlSession>): Promise<CrawlSession>;
export declare function getSessionFromUser(): Promise<CrawlSession>;
//# sourceMappingURL=session.d.ts.map