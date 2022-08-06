var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Fixture } from "../entities/fixture.js";
import { CrawlSession } from "../entities/crawl-session.js";
import { CrawlSessionReccord } from "../entities/crawl-session-reccord.js";
import { readFileSync } from "fs";
import { CONF_PATH } from "../consts/paths.js";
var confStr = readFileSync(CONF_PATH).toString();
var conf = JSON.parse(confStr);
export var oddsDataSource = new DataSource(__assign(__assign({}, conf.oddsDatabase), { 
    // type: "sqlite",
    // database: join(resolve(), "metalo-baza.sqlite"),
    type: "mariadb", entities: [Fixture, CrawlSession, CrawlSessionReccord], logging: false, 
    // logger: "",
    synchronize: true, dropSchema: false }));
//# sourceMappingURL=orm.js.map