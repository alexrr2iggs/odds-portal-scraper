import { Repository } from "typeorm";
import { CrawlSession } from "../entities/crawl-session";
import { Fixture } from "../entities/fixture";

export asyimport { Repository } from "typeorm";
import { CrawlSession } from "../entities/crawl-session";
import { Fixture } from "../entities/fixture";

export async function writeFixtures(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>) {
    for (const fixture of fixtures) {
        try {
            await repoFix.save(fixture);
            session.totInserted++;
            await repoSex.save(session);
        } catch (error) {
            console.error(error);
        }
    }
}

export async function writeFixturesBulk(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>) {
    await repoFix.save(fixtures);
    session.totInserted += fixtures.length;
    await repoSex.save(session);
}