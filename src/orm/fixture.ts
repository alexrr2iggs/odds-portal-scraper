import { time } from "iggs-utils";
import { Repository } from "typeorm";
import { CrawlSession } from "../entities/crawl-session.js";
import { Fixture } from "../entities/fixture.js";
import { writeError } from "../services/error.js";
import { sleep } from "../utils/varoius.js";

export async function writeFixtures(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>, url:string) {
    for (const fixture of fixtures) {
        try {
            await writeFixture(fixture, repoFix, url);
            session.totInserted++;
            await repoSex.save(session);
        } catch (error) {
            writeError(error,[fixture], url);
            console.error(error);
        }
    }
}


export async function writeFixture(fixture: Fixture, repoFix: Repository<Fixture>, url:string) {
    var error;
    for(let i=1;i<=30;i++){
        try {
            return await repoFix.save(fixture);
        } catch (err) {
            error=err;
            console.error('error writing fixture on db. attempt: '+i);
            try {console.error(JSON.stringify(fixture))} catch (erro) {console.error(erro)}
            console.error(error);
            await sleep(i*time.seccond);
        }
    }

    try {writeError(error,[fixture], url)} catch (e) {console.error(e)}
    
    process.exit(1);
}


export async function writeFixturesBulk(fixtures: Fixture[], session: CrawlSession, repoFix: Repository<Fixture>, repoSex: Repository<CrawlSession>) {
    await repoFix.save(fixtures);
    session.totInserted += fixtures.length;
    await repoSex.save(session);
}