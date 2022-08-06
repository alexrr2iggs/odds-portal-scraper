import { Fixture } from "../entities/fixture.js";
/**
 *
 * @param fixtures
 * @returns [min, max]
 */
export declare function getMaxMinTimes(fixtures: Fixture[]): [number, number];
export declare function generateID(team1: string, team2: string, date: string): string;
export declare const fixtureID: (fixture: Fixture) => string;
//# sourceMappingURL=fixture.d.ts.map