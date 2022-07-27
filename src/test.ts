import { getPage, initBrowser } from './services/puppeter.js';
import { getResults } from './services/results.js';

initBrowser();

(async () => {
	await initBrowser({ headless: false, defaultViewport: { height: 1080, width: 1920 } });

	const page = await getPage('https://www.oddsportal.com/baseball/usa/mlb/#/page/1');

	console.log('start');
	var fixtures = await getResults(page);
	console.log(fixtures);

	console.log('end');
})();
