import { time } from 'iggs-utils';
import { MoreThan } from 'typeorm';
import { Fixture } from './entities/fixture.js';
import { oddsDataSource } from './orm/orm.js';

oddsDataSource
	.initialize()
	.then(ds => ds.getRepository(Fixture))
	.then(repo => repo.delete({ date: MoreThan(new Date(Date.now() - time.day).toISOString()) }))
	.finally(() => process.exit(0));
