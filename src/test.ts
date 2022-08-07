import { getPage, initBrowser } from './services/puppeter.js';
import { getResults } from './services/results.js';

(async () => {
	await initBrowser({ headless: true, defaultViewport: { height: 1080, width: 1920 } });
	const page = await getPage('https://www.oddsportal.com/soccer/germany/oberliga-bayern-nord/results/');
	const fixtures = await getResults(page);
	console.log(fixtures);
})();
