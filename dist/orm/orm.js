import "reflect-metadata";
import { DataSource } from "typeorm";
import { Fixture } from "../entities/fixture.js";
import { resolve, join } from 'path';
import { CrawlSession } from "../entities/crawl-session.js";
import { CrawlSessionReccord } from "../entities/crawl-session-reccord.js";
export var appDataSource = new DataSource({
    type: "sqlite",
    database: join(resolve(), "metalo-baza.sqlite"),
    entities: [Fixture, CrawlSession, CrawlSessionReccord],
    logging: false,
    logger: "debug",
    synchronize: true,
    dropSchema: false
});
//# sourceMappingURL=orm.js.map