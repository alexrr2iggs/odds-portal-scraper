import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fixture } from "../entities/fixture.js"
import { resolve, join } from 'path'
import { CrawlSession } from "../entities/crawl-session.js";
import { CrawlSessionReccord } from "../entities/crawl-session-reccord.js";
import { readFileSync } from "fs";
import { CONF_PATH } from "../consts/paths.js";
import { OddsPortalScraperConf } from "../types/conf.js";
const confStr = readFileSync(CONF_PATH).toString();
const conf:OddsPortalScraperConf = JSON.parse(confStr);


export const oddsDataSource = new DataSource({
    ...conf.oddsDatabase,
    
    // type: "sqlite",
    // database: join(resolve(), "metalo-baza.sqlite"),
    type: "mariadb",

    entities: [Fixture, CrawlSession, CrawlSessionReccord],
    logging: false,
    
    // logger: "",
    synchronize: true,
    dropSchema: false,
});


