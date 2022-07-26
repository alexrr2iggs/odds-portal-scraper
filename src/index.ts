import { endDateIn, startDateIn } from './cli/date-input.js';
import { headlesConfirm } from './cli/headless.js';
// const { Command } = require('commander');
import chalk from 'chalk';
import inquirer from 'inquirer';
import { PuppeteerLaunchOptions } from 'puppeteer';
import { continueInterruptedSession, continueInterruptedSessions } from './cli/continue-unfinished-sessions.js';
import { selectGame } from './cli/select-game.js';
import { selectSession } from './cli/select-session.js';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, scrapSessiontoString } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { appDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { writeError } from './services/error.js';
import { getFixtures } from './services/fixture.js';
import { getLeagueList } from './services/league.js';
import { getPage, goto, initBrowser } from './services/puppeter.js';
import { getMaxMinTimes } from './utils/fixture.js';

const blue = chalk.hex('054ef7');
const red = chalk.hex('E4181C');

(async () => {
	const ds = await appDataSource.initialize();
	const repoSession = ds.getRepository(CrawlSession);
	const repoFix = ds.getRepository(Fixture);

	var session: CrawlSession;

	const previousSessions = await repoSession.find({
		relations: { reccords: true }
	});

	if (previousSessions.length) {
		console.log('interrupted sessions:\n\n');
		previousSessions.forEach(ps => console.log(chalk.bgWhite(chalk.black(scrapSessiontoString(ps)))));
		console.log('\n\n\n\n\n');
	}

	const puppeteerLaunchOptions = await inquirer.prompt<PuppeteerLaunchOptions>(headlesConfirm);

	initBrowser({
		...puppeteerLaunchOptions,
		defaultViewport: { height: 1080, width: 1920 }
	});

	if (previousSessions.length === 1) {
		const continueOldSession = await inquirer.prompt(continueInterruptedSession);
		if (continueOldSession.continueInterruptedSession) session = previousSessions[0];
	}

	if (previousSessions.length > 1) {
		const continueOldSession = await inquirer.prompt(continueInterruptedSessions);

		if (continueOldSession.continueInterruptedSessions) {
			const selectedSession = await inquirer.prompt(selectSession(previousSessions));
			session = selectedSession.session;
		}
	}

	if (!session) {
		const newSession = await inquirer.prompt([startDateIn, endDateIn, selectGame]);

		session = new CrawlSession();
		session.start = newSession.start;
		session.end = newSession.end;
		session.reccords = [];
		session.game = newSession.game;

		session = await ds.getRepository(CrawlSession).save(session);
	}

	const startDate = new Date(session.start);
	const endDate = new Date(session.end);
	const startDateTime = startDate.getTime();
	const endDateTime = endDate.getTime();
	const startYear = startDate.getFullYear();
	const endYear = endDate.getFullYear();
	const insertedLeagues = session?.reccords?.map(r => r.league);

	if (startDateTime > endDateTime) {
		console.error('wai pula, ai baut??? data dinainiti ii mai mari ca seia dinapoi, sii cu tine???', 'start: ' + session.start, 'end: ' + session.end);
		console.log('hai mai insiarca odat, si nu si timpit');
		return;
	}

	const page = await getPage(LEAGUES_URL[session.game]);
	const leagues = await getLeagueList(page, session.game);

	for (const league of leagues) {
		if (insertedLeagues?.includes(league.league)) continue;

		console.log(red(league.url));
		await goto(page, league.url);

		const campionati = await getCampionatList(page);

		writeCampionati: for (const campionat of campionati) {
			if (!campionat.campionat.length) continue writeCampionati;

			const years = campionat?.campionat
				?.match(/\d{4}/g)
				?.map(y => +y)
				?.sort();

			const campionatStartYear = years[0];
			const campionatEndYear = years[1] || years[0];

			if (campionatStartYear < startYear || campionatEndYear > endYear) continue writeCampionati;

			console.log(chalk.white(campionat.url));
			await goto(page, campionat.url);
			const lastpaPageNr = await getCampionatLastPage(page);
			writePages: for (let currentPageNumber = lastpaPageNr; currentPageNumber > 0; currentPageNumber--) {
				const URL = campionat.url + '#/page/' + currentPageNumber;
				console.log(blue(URL));
				await goto(page, URL);
				var fixtures = await getFixtures(page);
				fixtures = fixtures?.filter(f => !!f?.date);

				if (!fixtures?.length) continue writePages;

				fixtures = fixtures.map(fixture => {
					const fixtureEntity = new Fixture(fixture);
					fixtureEntity.campionat = campionat.campionat;
					fixtureEntity.league = league.league;
					fixtureEntity.game = session.game;
					return fixtureEntity;
				});

				try {
					await repoFix.save(fixtures);
					session.totInserted += fixtures.length;
					await repoSession.save(session);
				} catch (error) {
					console.error(error);
					writeError(error, fixtures, URL);
				}

				const [minTime, maxTime] = getMaxMinTimes(fixtures);
				if (minTime < startDateTime) continue writeCampionati;
				if (maxTime > endDateTime) continue writePages;
			}
		}
		session.totLeagues++;
		const reccord = new CrawlSessionReccord();
		reccord.crawlSession = session;
		reccord.league = league.league;

		session.reccords.push(reccord);
		await ds.getRepository(CrawlSessionReccord).save(reccord);
		await repoSession.save(session);
	}
	console.log(chalk.greenBright('wai, so terminat!'));
	await ds.getRepository(CrawlSession).remove(session);
})();
