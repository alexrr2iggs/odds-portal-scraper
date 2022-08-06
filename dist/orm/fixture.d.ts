import { Repository } from "typeorm";
import { CrawlSession } from "../entities/crawl-session.js";
import { Fixture } from "../entities/fixture.js";
export declare function writeFixtures(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>, url: string): Promise<void>;
export declare function writeFixture(fixture: Fixture, repoFix: Repository<Fixture>, url: string): Promise<Fixture>;
export declare function writeFixturesBulk(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>): Promise<void>;
//# sourceMappingURL=fixture.d.ts.map