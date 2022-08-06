import { time } from 'iggs-utils';
import { MoreThan } from 'typeorm';
import { Fixture } from './entities/fixture.js';
import { oddsDataSource } from './orm/orm.js';
oddsDataSource
    .initialize()
    .then(function (ds) { return ds.getRepository(Fixture); })
    .then(function (repo) { return repo["delete"]({ date: MoreThan(new Date(Date.now() - time.day).toISOString()) }); })["finally"](function () { return process.exit(0); });
//# sourceMappingURL=clean_up.js.map