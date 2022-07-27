import { getCampionatLastPage } from './services/campionat.js';
import { getPage, initBrowser } from './services/puppeter.js';

initBrowser();

(async () => {
	await initBrowser({ headless: false, defaultViewport: { height: 1080, width: 1920 } });

	const page = await getPage('https://www.oddsportal.com/badminton/singapore/bwf-world-tour-singapore-open-doubles-women/results/');

	console.log('start');
	var fixtures = await getCampionatLastPage(page);
	console.log(fixtures);

	console.log('end');
})();
