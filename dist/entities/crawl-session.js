var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bytes } from 'iggs-utils';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CrawlSessionReccord } from './crawl-session-reccord.js';
export var SessionCreator;
(function (SessionCreator) {
    SessionCreator["SYSTEM"] = "SYSTEM";
    SessionCreator["USER"] = "USER";
})(SessionCreator || (SessionCreator = {}));
var gamesTransformer = {
    to: function (games) {
        return JSON.stringify(games);
    },
    from: function (value) {
        return JSON.parse(value);
    }
};
var CrawlSession = /** @class */ (function () {
    function CrawlSession() {
    }
    __decorate([
        PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CrawlSession.prototype, "ID");
    __decorate([
        OneToMany(function () { return CrawlSessionReccord; }, function (reccord) { return reccord.crawlSession; }),
        JoinColumn(),
        __metadata("design:type", Array)
    ], CrawlSession.prototype, "reccords");
    __decorate([
        Column({ type: 'varchar', length: 3 * bytes.kB, transformer: gamesTransformer }),
        __metadata("design:type", Array)
    ], CrawlSession.prototype, "games");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], CrawlSession.prototype, "start");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], CrawlSession.prototype, "end");
    __decorate([
        Column({ "default": 0 }),
        __metadata("design:type", Number)
    ], CrawlSession.prototype, "totInserted");
    __decorate([
        Column({ "default": 0 }),
        __metadata("design:type", Number)
    ], CrawlSession.prototype, "totLeagues");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], CrawlSession.prototype, "createdBy");
    __decorate([
        Column({ "default": false }),
        __metadata("design:type", Boolean)
    ], CrawlSession.prototype, "complete");
    __decorate([
        Column({ "default": new Date().toISOString() }),
        __metadata("design:type", String)
    ], CrawlSession.prototype, "createdAt");
    __decorate([
        Column({ "default": new Date().toISOString() }),
        __metadata("design:type", String)
    ], CrawlSession.prototype, "updatedAt");
    CrawlSession = __decorate([
        Entity()
    ], CrawlSession);
    return CrawlSession;
}());
export { CrawlSession };
export function scrapSessiontoString(cs) {
    return 'createdAt: ' + cs.createdAt + ', game: ' + cs.games + ', start: ' + cs.start + ', end: ' + cs.end + ', totInserted: ' + cs.totInserted + ', totLeagues: ' + cs.totLeagues;
}
//# sourceMappingURL=crawl-session.js.map