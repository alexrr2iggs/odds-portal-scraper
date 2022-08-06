
import { createHash } from "crypto";
import { Fixture } from "../entities/fixture.js";

/**
 * 
 * @param fixtures 
 * @returns [min, max]
 */
export function getMaxMinTimes(fixtures:Fixture[]):[number,number]{
    const times = fixtures.map(f=> new Date(f.date).getTime());
    return [Math.min(...times),Math.max(...times)];
}


export function generateID(team1:string, team2:string, date:string):string{
    const idHash = createHash('sha256');
	idHash.write(team1+team2+date);
	return idHash.digest('hex');
}

export const fixtureID=(fixture:Fixture)=> generateID(fixture.team1, fixture.team2, fixture.date);