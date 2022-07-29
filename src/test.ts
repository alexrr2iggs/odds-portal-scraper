import { Fixture } from './entities/fixture.js';
// initBrowser();

import { appDataSource } from './orm/orm.js';
import { initBrowser } from './services/puppeter.js';

(async () => {
	await initBrowser({ headless: false, defaultViewport: { height: 1080, width: 1920 } });
	const ds = await appDataSource.initialize();

	const repoFix = ds.getRepository(Fixture);

	const fixtures = await repoFix.find({
		where: { campionat: 'NEXT_MATCH' }
	});

	fixtures.forEach(f => (f.campionat = 'updated'));

	await repoFix.save(fixtures);

	// const page = await getPage('https://www.oddsportal.com/badminton/singapore/bwf-world-tour-singapore-open-doubles-women/results/');

	// console.log('start');
	// var fixtures = await getCampionatLastPage(page);
	// console.log(fixtures);

	console.log('end');
})();
