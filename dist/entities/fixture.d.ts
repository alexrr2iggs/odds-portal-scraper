import { Game } from '../types/sport.js';
export declare class Fixture {
    constructor(fixture?: Fixture);
    ID: string;
    campionat: string;
    league: string;
    country: string;
    date: string;
    team1: string;
    team2: string;
    team1Score: number;
    team2Score: number;
    quote1: number;
    quotex: number;
    quote2: number;
    game: Game;
    createdAt?: Date;
    updatedAt?: string;
}
//# sourceMappingURL=fixture.d.ts.map