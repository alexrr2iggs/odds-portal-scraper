import { Entity, Column, PrimaryColumn } from "typeorm"
import { Game } from "../types/sport.js";



@Entity()
// @Unique('all unique', ['campionat', 'league', 'date', 'team1', 'team2'])
export class Fixture {
    constructor(fixture?: Fixture) {
        this.campionat = fixture?.campionat;
        this.league = fixture?.league;
        this.date = fixture?.date;
        this.team1 = fixture?.team1;
        this.team2 = fixture?.team2;
        this.team1Score = fixture?.team1Score;
        this.team2Score = fixture?.team2Score;
        this.quote1 = fixture?.quote1;
        this.quotex = fixture?.quotex;
        this.quote2 = fixture?.quote2;
    }
    // @PrimaryGeneratedColumn()
    // ID: number

    @PrimaryColumn()
    campionat?: string;

    @PrimaryColumn()
    league?: string;

    @PrimaryColumn()
    date: string;

    @PrimaryColumn()
    team1: string;

    @PrimaryColumn()
    team2: string;

    @Column({ nullable: true })
    team1Score: number;

    @Column({ nullable: true })
    team2Score: number;

    @Column()
    quote1: number;

    @Column({ nullable: true })
    quotex: number;

    @Column()
    quote2: number;

    @Column()
    game: Game;
}