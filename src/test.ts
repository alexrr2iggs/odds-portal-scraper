import { getFixtures } from './services/fixture.js';
import { getPage, initBrowser } from './services/puppeter.js';

initBrowser();

(async () => {
	await initBrowser();

	const page = await getPage('https://www.oddsportal.com/soccer/belgium/belgium-third-division-group-a-2012-2013/results/');

	var fixtures = await getFixtures(page);

	console.log(fixtures);
})();
