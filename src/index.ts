import { endDateIn, startDateIn } from './cli/date-input.js';
import { headlesConfirm } from './cli/headless.js';
import { NEXT_MATCH } from './consts/various.js';
// const { Command } = require('commander');
import chalk from 'chalk';
import { time } from 'iggs-utils';
import inquirer from 'inquirer';
import { PuppeteerLaunchOptions } from 'puppeteer';
import { continueInterruptedSession, continueInterruptedSessions } from './cli/continue-unfinished-sessions.js';
import { selectGames } from './cli/select-game.js';
import { selectSession } from './cli/select-session.js';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, scrapSessiontoString } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { appDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { writeError } from './services/error.js';
import { getLeagueList } from './services/league.js';
import { getPage, getTTotpagesVisited, initBrowser, navigate } from './services/puppeter.js';
import { getResults } from './services/results.js';
import { getMaxMinTimes } from './utils/fixture.js';

const BLUE_HEX = '0072CE';
const RED_HEX = 'E4181C';

const blueFg = chalk.hex(BLUE_HEX);
const redFg = chalk.hex(RED_HEX);
const blueBg = chalk.bgHex(BLUE_HEX);
const redBg = chalk.bgHex(RED_HEX);

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

	await initBrowser({
		...puppeteerLaunchOptions,
		defaultViewport: { height: 1080, width: 1920 }
		// slowMo: 200
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
		const newSession = await inquirer.prompt([startDateIn, endDateIn, selectGames]);

		session = new CrawlSession();
		session.start = newSession.start;
		session.end = newSession.end;
		session.reccords = [];
		session.games = newSession.games;

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

	const startScrapping = Date.now();

	for (const game of session.games) {
		console.log(redFg(`🔎 looking for LEAGUES, game: ${game}: ${LEAGUES_URL[game]}`));
		const page = await getPage(LEAGUES_URL[game]);
		const leagues = await getLeagueList(page, game);

		for (const league of leagues) {
			if (insertedLeagues?.includes(league.league)) continue;

			await navigate(page, league.url);

			console.log(redFg(`🔎 looking for CAMPIONATI, league: ${league?.league}: ${league?.url}`));
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

				writePages: for (let currentPageNumber = lastpaPageNr; currentPageNumber > 0; currentPageNumber--) {
					const pageURL = campionat.url + '#/page/' + currentPageNumber;
					console.log(blueFg(`🔎 looking for FIXTURES: ${pageURL}`));

					await navigate(page, pageURL);
					// await navigate(page, pageURL);
					var fixtures = await getResults(page);
					fixtures = fixtures?.filter(f => !!f?.date);

					if (!fixtures?.length) continue writePages;

					const [minTime, maxTime] = getMaxMinTimes(fixtures);

					// if most recent fixture of page is older than start date, go to next page
					if (maxTime < startDateTime) continue writePages;

					// if oldest fixture of page is newer than end date, go to next campionat
					if (minTime > endDateTime) continue writeCampionati;

					fixtures = fixtures.map(fixture => {
						const fixtureEntity = new Fixture(fixture);
						fixtureEntity.campionat = campionat.campionat;
						fixtureEntity.league = league.league;
						fixtureEntity.game = game;
						return fixtureEntity;
					});

					try {
						await repoFix.save(fixtures);
						session.totInserted += fixtures.length;
						await repoSession.save(session);
						console.log(
							blueBg(
								`📝 writed on metalo baza ${fixtures.length} fixtures, campionat: ${campionat.campionat}, league: ${league.league}, game: ${game}, from: ${new Date(minTime).toLocaleString()}, to: ${new Date(
									maxTime
								).toLocaleString()}, page: ${currentPageNumber}`
							)
						);
					} catch (error) {
						console.error(error);
						writeError(error, fixtures, pageURL);
					}
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
	}
	await ds.getRepository(CrawlSession).remove(session);
	const endScrapping = Date.now();

	console.log(chalk.greenBright('\ngo finio, porco zio! 🥳🥳🥳\n'));
	console.log(`${session.totLeagues} leagues scrapped, ${session.totInserted} fixtures scrapped, ${getTTotpagesVisited()} pages visited, in ${(endScrapping - startScrapping) / time.minute} minutes`);
})();
