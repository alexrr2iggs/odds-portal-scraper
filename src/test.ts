import { getCampionatList } from './services/campionat.js';
import { getPage, initBrowser } from './services/puppeter.js';

initBrowser();

(async () => {
	await initBrowser();

	const page = await getPage('https://www.oddsportal.com/soccer/slovakia/4-liga-east/results/');

	console.log('start');
	var fixtures = await getCampionatList(page);
	console.log('end');

	console.log(fixtures);
})();
