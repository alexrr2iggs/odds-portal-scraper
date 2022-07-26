import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { Fixture } from "../entities/fixture";
import { time } from "iggs-utils"

export function writeError(e: Error, fixtures: Fixture[], fixturePageUrl: string) {
    const errors_dir = join(resolve(), 'errors');
    if (!existsSync(errors_dir)) {
        
        try {
            mkdirSync(errors_dir);
        } catch (error) {
            console.error(error);
        }
    }

    const error_dir = join(errors_dir, new Date().toISOString().replace(/:/g,'-' ));

    try {
        mkdirSync(error_dir);
    } catch (error) {
        console.error(error);
    }

    try {

        writeFileSync(join(error_dir, 'url.txt'), fixturePageUrl);
    } catch (error) {
        console.error(error);
    }
    try {

        writeFileSync(join(error_dir, 'error.txt'), e?.message || e?.toString());
    } catch (error) {
        console.error(error);

    }
    try {

        writimport { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { Fixture } from "../entities/fixture";
import { time } from "iggs-utils"

export function writeError(e: Error, fixtures: Fixture[], fixturePageUrl: string) {
    const errors_dir = join(resolve(), 'errors');
    if (!existsSync(errors_dir)) {
        
        try {
            mkdirSync(errors_dir);
        } catch (error) {
            console.error(error);
        }
    }

    const error_dir = join(errors_dir, new Date().toISOString().replace(/:/g,'-' ));

    try {
        mkdirSync(error_dir);
    } catch (error) {
        console.error(error);
    }

    try {

        writeFileSync(join(error_dir, 'url.txt'), fixturePageUrl);
    } catch (error) {
        console.error(error);
    }
    try {

        writeFileSync(join(error_dir, 'error.txt'), e?.message || e?.toString());
    } catch (error) {
        console.error(error);

    }
    try {

        writeFileSync(join(error_dir, 'fixtures.json'), JSON.stringify(fixtures, null, 4));
    } catch (error) {
        console.error(error);
    }
}