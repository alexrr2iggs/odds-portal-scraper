/**
 *
 * @param fixtures
 * @returns [min, max]
 */
export function getMaxMinTimes(fixtures) {
    var times = fixtures.map(function (f) { return new Date(f.date).getTime(); });
    return [Math.min.apply(Math, times), Math.max.apply(Math, times)];
}
//# sourceMappingURL=fixture.js.map