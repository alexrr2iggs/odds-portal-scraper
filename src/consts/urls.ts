import { Game } from "../types/sport.js";

export const ODDSPORTAL_BASE_URL = "https://www.oddsportal.com";
export const SOCCER_LEAGUES_URL = ODDSPORTAL_BASE_URL + "/results/#soccer";
export const BASKETBALL_LEAGUES_URL = ODDSPORTAL_BASE_URL + "/results/#basketball";
export const BASEBALL_LEAGUES_URL = ODDSPORTAL_BASE_URL + "/results/#baseball";


export const LEAGUES_URL: { [key in Game]: string } = {
    BASEBALL: BASEBALL_LEAGUES_URL,
    BASKETBALL: BASKETBALL_LEAGUES_URL,
    SOCCER: SOCCER_LEAGUES_URL
}