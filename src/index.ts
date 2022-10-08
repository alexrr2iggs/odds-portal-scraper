import { headlesConfirm } from './cli/headless.js';
import { NEXT_MATCH } from './consts/various.js';
import chalk from 'chalk';
import { time } from 'iggs-utils';
import inquirer from 'inquirer';
import { PuppeteerLaunchOptions } from 'puppeteer';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, scrapSessiontoString, SessionCreator } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { oddsDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { writeError } from './services/error.js';
import { getLeagueList } from './services/leagues.js';
import { getPage, getTTotpagesVisited, initBrowser, navigate } from './services/puppeter.js';
import { getResults } from './services/results.js';
import { fixtureID, getMaxMinTimes } from './utils/fixture.js';
import {program } from "commander"
import { getSession } from './services/session.js';
import { writeFixtures } from './orm/fixture.js';




const BLUE_HEX = '0072CE';
const RED_HEX = 'E4181C';

const blueFg = chalk.hex(BLUE_HEX);
const redFg = chalk.hex(RED_HEX);
const blueBg = chalk.bgHex(BLUE_HEX);
const redBg = chalk.bgHex(RED_HEX);

program
  .option('-i, --intercative');

program.parse();

const options = program.opts();
const interactive = options.intercative;


(async () => {
	const ds = await oddsDataSource.initialize();
	const repoSession = ds.getRepository(CrawlSession);
	const repoFix = ds.getRepository(Fixture);
	const previousSessions = await repoSession.find({
		where: { complete: false },
		relations: { reccords: true }
	});

	if (previousSessions.length) {
		const userSessions = previousSessions.filter(s=> s.createdBy===SessionCreator.USER);
		const syetemSessions = previousSessions.filter(s=> s.createdBy===SessionCreator.SYSTEM);
		
		
		console.log('user interrupted sessions:');
		userSessions.forEach(ps => console.log(chalk.bgYellow(chalk.black(scrapSessiontoString(ps)))));

		console.log('\n\nsystem interrupted sessions:');
		syetemSessions.forEach(ps => console.log(chalk.bgGray(chalk.black(scrapSessiontoString(ps)))));

		console.log('\n\n\n\n\n');
	}

	var headless = true;
	if(interactive)
	{
		const puppeteerLaunchOptions = await inquirer.prompt<PuppeteerLaunchOptions>(headlesConfirm);
		headless=!!puppeteerLaunchOptions?.headless;

	}

	await initBrowser({
		headless,
		defaultViewport: { height: 1080, width: 1920 }
		// slowMo: 200
	});


	var session = await getSession(interactive, repoSession);



	const startDate = new Date(session.start);
	const endDate = new Date(session.end);
	const startDateTime = startDate.getTime();
	const endDateTime = endDate.getTime();
	const startYear = startDate.getFullYear();
	const endYear = endDate.getFullYear();
	// const insertedLeagues = session?.reccords?.map(r => r.league);

	if (startDateTime > endDateTime) {
		console.error('wai pula, ai baut??? data dinainiti ii mai mari ca seia dinapoi, sii cu tine???', 'start: ' + session.start, 'end: ' + session.end);
		console.log('hai mai insiarca odat, si nu si timpit');
		return;
	}

 
	// for (const game of session.games) {
		// console.log(redFg(`🔎 looking for LEAGUES, game: ${game}: ${LEAGUES_URL[game]}`));
		const page = await getPage(LEAGUES_URL);
		const leagues = await getLeagueList(page);

		for (const league of leagues) {
			if(!session.games.includes(league.game)) continue;

			const alreadyInserted = session?.reccords?.some(reccord=>reccord.country===league.country && reccord.league===league.league && reccord.game===league.game);
			if (alreadyInserted) continue;
			
			console.log(redFg(`🔎 looking for CAMPIONATI, league: ${league?.league}: ${league?.url}`));
			await navigate(page, league.url);
			const campionati = await getCampionatList(page);

			writeCampionati: for (const campionat of campionati) {
				if (!campionat.campionat.length) continue writeCampionati;

				const years = campionat?.campionat
					?.match(/\d{4}/g)
					?.map(y => +y)
					?.sort();

				const campionatStartYear = years?.[0];
				const campionatEndYear = years?.[1] || years?.[0];

				if (campionat?.campionat !== NEXT_MATCH && (campionatStartYear < startYear || campionatEndYear > endYear)) continue writeCampionati;

				// console.log(chalk.white(campionat.url));
				console.log(chalk.white(`🔎 looking for "LAST PAGE NR.", campionat: ${campionat?.campionat}: ${campionat?.url}`));

				await navigate(page, campionat.url);
				const lastpaPageNr = await getCampionatLastPage(page);

				writePages: for (let currentPageNumber = 1; currentPageNumber <= lastpaPageNr; currentPageNumber++) {
					const pageURL = campionat.url + '#/page/' + currentPageNumber;
					console.log(blueFg(`🔎 looking for FIXTURES: ${pageURL}`));

					await navigate(page, pageURL);
					// await navigate(page, pageURL);
					var fixtures = await getResults(page);
					fixtures = fixtures?.filter(f => !!f?.date);

					if (!fixtures?.length) continue writePages;

					const [minTime, maxTime] = getMaxMinTimes(fixtures);


					if (maxTime < startDateTime) continue writeCampionati;
					if (minTime > endDateTime) continue writePages;

					/*
					// if most recent fixture of page is older than start date, go to next page
					if (maxTime < startDateTime) continue writePages;

					// if oldest fixture of page is newer than end date, go to next campionat
					if (minTime > endDateTime) continue writeCampionati;
					*/
					fixtures = fixtures.map(fixture => {
						const fixtureEntity = new Fixture(fixture);
						fixtureEntity.campionat = campionat.campionat;
						fixtureEntity.league = league.league;
						fixtureEntity.game = league.game;
						fixtureEntity.country = league.country;

						fixtureEntity.ID=fixtureID(fixtureEntity);
						return fixtureEntity;
					});

					try {
						await repoFix.save(fixtures);
						session.totInserted += fixtures.length;
						await repoSession.save(session);
						console.log(
							blueBg(
								`📝 writed on metalo baza ${fixtures.length} fixtures, campionat: ${campionat.campionat}, league: ${league.league}, game: ${league.game}, from: ${new Date(minTime).toLocaleString()}, to: ${new Date(
									maxTime
								).toLocaleString()}, page: ${currentPageNumber}`
							)
						);
					} catch (error) {
						console.error('error writing bulk fixtures on db, now trying to write one at a time');
						console.error(error);
						await writeFixtures(fixtures,session,repoFix,repoSession, page.url());
					}
				}
			}
			session.totLeagues++;
			const reccord = new CrawlSessionReccord();
			reccord.crawlSession = session;
			reccord.league = league.league;
			reccord.country = league.country;
			reccord.game = league.game;
			const savedSession = await ds.getRepository(CrawlSessionReccord).save(reccord);
			session.reccords.push(savedSession);
			await repoSession.save(session);
		}
	
	session.complete=true;
	await ds.getRepository(CrawlSession).save(session);
	await ds.getRepository(CrawlSessionReccord).remove(session.reccords);

	const startScrapping = new Date(session.createdAt).getTime();
	const endScrapping = Date.now();

	console.log(chalk.greenBright('\ngo finio, porco zio! 🥳🥳🥳\n'));
	console.log(`${session.totLeagues} leagues scrapped, ${session.totInserted} fixtures scrapped, ${getTTotpagesVisited()} pages visited, in ${(endScrapping - startScrapping) / time.minute} minutes`);
	process.exit();
})();
