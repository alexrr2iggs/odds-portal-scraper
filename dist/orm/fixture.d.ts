import { Repository } from "typeorm";
import { CrawlSession } from "../entities/crawl-session";
import { Fixture } from "../entities/fixture";
export declare function writeFixtures(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>): Promise<void>;
export declare function writeFixturesBulk(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>): Promise<void>;
//# sourceMappingURL=fixture.d.ts.map