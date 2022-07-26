var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { CrawlSession } from "./crawl-session.js";
var CrawlSessionReccord = /** @class */ (function () {
    function CrawlSessionReccord() {
    }
    __decorate([
        PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CrawlSessionReccord.prototype, "ID");
    __decorate([
        ManyToOne(function () { return CrawlSession; }, function (crawlSession) { return crawlSession.reccords; }, { cascade: true, onDelete: 'CASCADE', onUpdate: "CASCADE" }),
        JoinColumn(),
        __metadata("design:type", CrawlSession)
    ], CrawlSessionReccord.prototype, "crawlSession");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], CrawlSessionReccord.prototype, "league");
    __decorate([
        CreateDateColumn({ "default": new Date().toISOString() }),
        __metadata("design:type", String)
    ], CrawlSessionReccord.prototype, "createdAt");
    CrawlSessionReccord = __decorate([
        Entity()
    ], CrawlSessionReccord);
    return CrawlSessionReccord;
}());
export { CrawlSessionReccord };
//# sourceMappingURL=crawl-session-reccord.js.map