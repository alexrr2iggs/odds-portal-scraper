import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
export function writeError(e, fixtures, fixturePageUrl) {
    var errors_dir = join(resolve(), 'errors');
    if (!existsSync(errors_dir)) {
        try {
            mkdirSync(errors_dir);
        }
        catch (error) {
            console.error(error);
        }
    }
    var error_dir = join(errors_dir, new Date().toISOString().replace(/:/g, '-'));
    try {
        mkdirSync(error_dir);
    }
    catch (error) {
        console.error(error);
    }
    try {
        if (fixturePageUrl === null || fixturePageUrl === void 0 ? void 0 : fixturePageUrl.length)
            writeFileSync(join(error_dir, 'url.txt'), fixturePageUrl);
    }
    catch (error) {
        console.error(error);
    }
    try {
        var errorStr = (e === null || e === void 0 ? void 0 : e.message) || (e === null || e === void 0 ? void 0 : e.toString()) || (JSON === null || JSON === void 0 ? void 0 : JSON.stringify(e));
        if (errorStr === null || errorStr === void 0 ? void 0 : errorStr.length)
            writeFileSync(join(error_dir, 'error.txt'), errorStr);
    }
    catch (error) {
        console.error(error);
    }
    try {
        if (fixtures === null || fixtures === void 0 ? void 0 : fixtures.length)
            writeFileSync(join(error_dir, 'fixtures.json'), JSON.stringify(fixtures, null, 4));
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=error.js.map