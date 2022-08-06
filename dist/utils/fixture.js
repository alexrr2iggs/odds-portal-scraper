import { createHash } from "crypto";
/**
 *
 * @param fixtures
 * @returns [min, max]
 */
export function getMaxMinTimes(fixtures) {
    var times = fixtures.map(function (f) { return new Date(f.date).getTime(); });
    return [Math.min.apply(Math, times), Math.max.apply(Math, times)];
}
export function generateID(team1, team2, date) {
    var idHash = createHash('sha256');
    idHash.write(team1 + team2 + date);
    return idHash.digest('hex');
}
export var fixtureID = function (fixture) { return generateID(fixture.team1, fixture.team2, fixture.date); };
//# sourceMappingURL=fixture.js.map