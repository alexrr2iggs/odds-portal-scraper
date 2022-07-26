// const { Command } = require('commander');
import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { PuppeteerLaunchOptions } from 'puppeteer';
import { LEAGUES_URL } from './consts/urls.js';
import { CrawlSessionReccord } from './entities/crawl-session-reccord.js';
import { CrawlSession, crawlSessiontoString } from './entities/crawl-session.js';
import { Fixture } from './entities/fixture.js';
import { appDataSource } from './orm/orm.js';
import { getCampionatLastPage, getCampionatList } from './services/campionat.js';
import { writeError } from './services/error.js';
import { getFixtures } from './services/fixture.js';
import { getLeagueList } from './services/league.js';
import { getPage, initBrowser } from './services/puppeter.js';
import { Game } from './types/sport.js';
import { getMaxMinTimes } from './utils/fixture.js';

const blue = chalk.hex('054ef7');
const red = chalk.hex('E4181C');

const program = new Command();

program.name('odds portal crowler').description('crowler for odds portal');

program
	// .command('scaceesti')
	.description('Downloads fixtures between 2 dates')
	.option('-s, --start <string>', 'data dinainiti ii di cind s scaceesti huiniaua')
	.option('-e, --end', 'data dinainiti ii pan cind s scaceesti huiniaua', new Date().toISOString());

program.parse();

const options = program.opts();

(async () => {
	const ds = await appDataSource.initialize();
	const repoSession = ds.getRepository(CrawlSession);
	const repoFix = ds.getRepository(Fixture);

	var session: CrawlSession;

	const previousSessions = await repoSession.find({
		relations: { reccords: true }
	});

	if (previousSessions.length) {
		console.log('sessiuni neterminate:');

		previousSessions.forEach(ps => console.log(crawlSessiontoString(ps)));
	}

	const puppeteerLaunchOptions = await inquirer.prompt<PuppeteerLaunchOptions>({
		name: 'headless',
		type: 'list',
		message: 'bai pula, vrei sa vezi tat huineaua?',
		choices: [
			{
				name: 'aha',
				value: false
			},
			{
				name: 'naha',
				value: true
			}
		]
	});

	initBrowser({
		...puppeteerLaunchOptions,
		defaultViewport: { height: 1080, width: 1920 }
	});

	if (previousSessions.length === 1) {
		const continueOldSession = await inquirer.prompt({
			name: 'continueOldSession',
			type: 'list',
			message: 'ba pula, am vazut ca mai inainte ai intrerupt o sessioni neterminata, vrei so termini?',
			choices: [
				{
					name: 'da vreu',
					value: true
				},
				{
					name: 'Nu, nu vreu',
					value: false
				}
			]
		});
		// console.log(continueOldSession);
		if (continueOldSession.continueOldSession) session = previousSessions[0];
	}

	if (previousSessions.length > 1) {
		const continueOldSession = await inquirer.prompt({
			name: 'continueOldSession',
			type: 'list',
			message: 'ba pula, am vazut ca mai inainte ai intrerupt niste sessioni neterminate, vrei sa le termini?',

			choices: [
				{
					name: 'Da, te rog',
					value: true
				},
				{
					name: 'Mersi mult, da eu nu vreu',
					value: false
				}
			]
		});

		if (continueOldSession.continueOldSession) {
			const selectedSession = await inquirer.prompt({
				name: 'selectedSession',
				type: 'list',
				message: 'apu ie s to aleji, mai rebdi',
				choices: previousSessions.map(ps => ({
					name: crawlSessiontoString(ps),
					value: ps
				}))
			});

			session = selectedSession.selectedSession;
		}
	}

	if (!session) {
		const newSession = await inquirer.prompt([
			{
				name: 'start',
				type: 'input',
				message: 'di cind trebu de scaceeit huinelili? (scrie o data in format ISO-8601, tipa "2022-07-25")'
			},
			{
				name: 'end',
				type: 'input',
				message: 'pina cind? daca nu scrii nica apu scaeesc pina amu',
				default: new Date().toISOString()
			},
			{
				name: 'game',
				type: 'list',
				message: 'si jiuaca vrei?',
				choices: [
					{
						name: 'futbol',
						value: Game.SOCCER
					},
					{
						name: 'basket',
						value: Game.BASKETBALL
					},
					{
						name: 'beizbol',
						value: Game.BASEBALL
					}
				]
			},
			{
				name: 'zelenski',
				type: 'list',
				message: 'zelenski ii petuh?',
				choices: [
					{
						name: 'da'
					},
					{
						name: 'Kanechno'
					}
				]
			}
		]);

		// const selectedGame = await inquirer.prompt();

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
		console.error('wai pula, ai baut??? data dinainiti ii mai mari ca seia dinapoi, sii cu tine???', 'start: ' + options.start, 'end: ' + options.end);
		console.log('hai mai insiarca odat, si nu si timpit');
		return;
	}

	const page = await getPage(LEAGUES_URL[session.game]);
	const leagues = await getLeagueList(page, session.game);

	for (const league of leagues) {
		if (insertedLeagues?.includes(league.league)) continue;

		console.log(red(league.url));
		await page.goto(league.url);

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
			await page.goto(campionat.url);
			const lastpaPageNr = await getCampionatLastPage(page);
			writePages: for (let currentPageNumber = lastpaPageNr; currentPageNumber > 0; currentPageNumber--) {
				const URL = campionat.url + '#/page/' + currentPageNumber;
				console.log(blue(URL));
				page.goto(URL);
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
