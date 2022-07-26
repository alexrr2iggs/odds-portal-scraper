import { QuestionCollection } from 'inquirer';
import { CrawlSession, scrapSessiontoString } from '../entities/crawl-session.js';

export function selectSession(sessions: CrawlSession[]): QuestionCollection<{ session: CrawlSession }> {
	return {
		name: 'session',
		type: 'list',
		message: 'select a session',
		choices: sessions.map(session => ({
			name: scrapSessiontoString(session),
			value: session
		}))
	};
}
