
import { Fixture } from "../entities/fixture";

/**
 * 
 * @param fixtures 
 * @returns [min, max]
 */
export function getMaxMinTimes(fixtures:Fixture[]):[number,number]{
    const times = fixtures.map(f=> new Date(f.date).getTime());
    return [Math.min(...times),Math.max(...times)];
}                                                                                                                                                                                                                                                                                                                                                                      
import { Fixture } from "../entities/fixture";

/**
 * 
 * @param fixtures 
 * @returns [min, max]
 */
export function getMaxMinTimes(fixtures:Fixture[]):[number,number]{
    const times = fixtures.map(f=> new Date(f.date).getTime());
    return [Math.min(...times),Math.max(...times)];
}