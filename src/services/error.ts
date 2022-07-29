import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { Fixture } from '../entities/fixture';

export function writeError(e: Error, fixtures: Fixture[], fixturePageUrl: string) {
	const errors_dir = join(resolve(), 'errors');
	if (!existsSync(errors_dir)) {
		try {
			mkdirSync(errors_dir);
		} catch (error) {
			console.error(error);
		}
	}

	const error_dir = join(errors_dir, new Date().toISOString().replace(/:/g, '-'));

	try {
		mkdirSync(error_dir);
	} catch (error) {
		console.error(error);
	}

	try {
		if (fixturePageUrl?.length) writeFileSync(join(error_dir, 'url.txt'), fixturePageUrl);
	} catch (error) {
		console.error(error);
	}
	try {
		const errorStr = e?.message || e?.toString() || JSON?.stringify(e);
		if (errorStr?.length) writeFileSync(join(error_dir, 'error.txt'), errorStr);
	} catch (error) {
		console.error(error);
	}
	try {
		if (fixtures?.length) writeFileSync(join(error_dir, 'fixtures.json'), JSON.stringify(fixtures, null, 4));
	} catch (error) {
		console.error(error);
	}
}
