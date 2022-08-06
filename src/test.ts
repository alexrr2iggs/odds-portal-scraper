import { writeFileSync } from 'fs';
import { join } from 'path';
import { Equal } from 'typeorm';
import { CrawlSession } from './entities/crawl-session.js';
import { oddsDataSource } from './orm/orm.js';
import { getLeagueList } from './services/leagues.js';
import { getPage, initBrowser, navigate } from './services/puppeter.js';
import { getResults } from './services/results.js';
import { getSessionFromUser } from './services/session.js';






(async ()=>{
	await initBrowser({headless:true, defaultViewport:{height:1080,width:1920}});
	const page= await getPage('https://www.oddsportal.com/soccer/usa/mls/#/page/1');
	const fixtures= await getResults(page);
	console.log(fixtures);
}
)()