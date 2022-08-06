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
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Game } from '../types/sport.js';
var Fixture = /** @class */ (function () {
    function Fixture(fixture) {
        this.campionat = fixture === null || fixture === void 0 ? void 0 : fixture.campionat;
        this.league = fixture === null || fixture === void 0 ? void 0 : fixture.league;
        this.date = fixture === null || fixture === void 0 ? void 0 : fixture.date;
        this.team1 = fixture === null || fixture === void 0 ? void 0 : fixture.team1;
        this.team2 = fixture === null || fixture === void 0 ? void 0 : fixture.team2;
        this.team1Score = fixture === null || fixture === void 0 ? void 0 : fixture.team1Score;
        this.team2Score = fixture === null || fixture === void 0 ? void 0 : fixture.team2Score;
        this.quote1 = fixture === null || fixture === void 0 ? void 0 : fixture.quote1;
        this.quotex = fixture === null || fixture === void 0 ? void 0 : fixture.quotex;
        this.quote2 = fixture === null || fixture === void 0 ? void 0 : fixture.quote2;
    }
    __decorate([
        PrimaryColumn(),
        __metadata("design:type", String)
    ], Fixture.prototype, "ID");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], Fixture.prototype, "campionat");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], Fixture.prototype, "league");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], Fixture.prototype, "country");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], Fixture.prototype, "date");
    __decorate([
        Column({ type: 'varchar', length: bytes.kB }),
        __metadata("design:type", String)
    ], Fixture.prototype, "team1");
    __decorate([
        Column({ type: 'varchar', length: bytes.kB }),
        __metadata("design:type", String)
    ], Fixture.prototype, "team2");
    __decorate([
        Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Fixture.prototype, "team1Score");
    __decorate([
        Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Fixture.prototype, "team2Score");
    __decorate([
        Column({ type: 'double' }),
        __metadata("design:type", Number)
    ], Fixture.prototype, "quote1");
    __decorate([
        Column({ nullable: true, type: 'double' }),
        __metadata("design:type", Number)
    ], Fixture.prototype, "quotex");
    __decorate([
        Column({ type: 'double' }),
        __metadata("design:type", Number)
    ], Fixture.prototype, "quote2");
    __decorate([
        Column(),
        __metadata("design:type", String)
    ], Fixture.prototype, "game");
    __decorate([
        CreateDateColumn(),
        __metadata("design:type", Date)
    ], Fixture.prototype, "createdAt");
    __decorate([
        UpdateDateColumn(),
        __metadata("design:type", String)
    ], Fixture.prototype, "updatedAt");
    Fixture = __decorate([
        Entity()
        // @Unique('all unique', ['campionat', 'league', 'date', 'team1', 'team2'])
        ,
        __metadata("design:paramtypes", [Fixture])
    ], Fixture);
    return Fixture;
}());
export { Fixture };
//# sourceMappingURL=fixture.js.map