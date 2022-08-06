import {  Equal, In, Repository } from "typeorm";
import { CrawlSession, SessionCreator } from "../entities/crawl-session.js";
import inquirer from 'inquirer';
import { selectSession } from "../cli/select-session.js";
import { endDateIn, startDateIn } from "../cli/date-input.js";
import { selectGames } from "../cli/select-game.js";
import { Game } from "../types/sport.js";
import { time } from "iggs-utils";
import { continueInterruptedSessions } from "../cli/continue-unfinished-sessions.js";



export async function getSession(interactive:boolean,repoSession: Repository<CrawlSession> ):Promise<CrawlSession>{
	const interrptedSessions = await repoSession.find({
        where:{complete:false},
		relations: { reccords: true }
	});

	var session: CrawlSession;

    if(interactive){
	    session= await selectSessionFromInterrputed(interrptedSessions?.filter(s=> s.createdBy===SessionCreator.USER));
	}else{
		session=interrptedSessions?.filter(s=> s.createdBy===SessionCreator.SYSTEM)[0];
	}

	if (!session && interactive) {
		const newSession = await getSessionFromUser();
		session = await repoSession.save(newSession);
	}

    if(!interactive && !session ){
        
        session= new CrawlSession();
        session.start = new Date(Date.now()-(2*time.day)).toISOString();
        session.end = new Date("6666-06-06").toISOString();
        session.reccords = [];
        session.createdBy =  SessionCreator.SYSTEM;
        session.games = [
            // Game.CRICKET,
            Game.SOCCER,
            Game.BASKETBALL,
            Game.BASEBALL,
            Game.HOCKEY,
            // Game.TENNIS,
            Game.AMERICAN_FOOTBALL,
            // Game.AUSSIE_RULES,
            Game.BADMINTON,
            // Game.BANDY,
            Game.BEACH_SOCCER,
            Game.BEACH_VOLLEYBALL,
            // Game.BOXING,
            Game.DARTS,
            // Game.FLOORBALL,
            // Game.FUTSAL,
            Game.HANDBALL,
            // Game.MMA,
            Game.PESAPALLO,
            Game.RUGBY_LEAGUE,
            Game.RUGBY_UNION,
            // Game.SNOOKER,
            Game.VOLLEYBALL,
            Game.WATER_POLO,
            Game.E_SPORTS,
        ];
        session =  await repoSession.save(session);
    }

    return session;
}

export async function  getSessionFromUser():Promise<CrawlSession>{
    const newSession = await inquirer.prompt([startDateIn, endDateIn, selectGames]);
    const session= new CrawlSession();
    session.start = newSession.start;
    session.end = newSession.end;
    session.reccords = [];
    session.games = newSession.games;
    session.createdBy = SessionCreator.USER;
    return session;

    // return await repoSession.save(session);
}

async function  selectSessionFromInterrputed(interruptedSessions:CrawlSession[]):Promise<CrawlSession>{
    if (interruptedSessions.length === 1) {
        const continueOldSession = await inquirer.prompt(continueInterruptedSessions);
        if (continueOldSession.continueInterruptedSessions) return interruptedSessions[0];
    }

    if (interruptedSessions.length > 1) {
        const continueOldSession = await inquirer.prompt(continueInterruptedSessions);

        if (continueOldSession.continueInterruptedSessions) {
            const selectedSession = await inquirer.prompt(selectSession(interruptedSessions));
            return selectedSession.session;
        }
    }

    // return await repoSession.save(session);
}