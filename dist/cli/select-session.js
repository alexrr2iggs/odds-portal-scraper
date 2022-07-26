import { scrapSessiontoString } from '../entities/crawl-session.js';
export function selectSession(sessions) {
    return {
        name: 'session',
        type: 'list',
        message: 'select a session',
        choices: sessions.map(function (session) { return ({
            name: scrapSessiontoString(session),
            value: session
        }); })
    };
}
//# sourceMappingURL=select-session.js.map