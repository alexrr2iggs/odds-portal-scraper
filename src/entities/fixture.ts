import { bytes } from 'iggs-utils';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Game } from '../types/sport.js';



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


	 @PrimaryColumn()
	 ID: string;

	@Column()
	campionat: string;

	@Column()
	league: string;

	@Column()
	country: string;

	@Column()
	date: string;

	@Column({type:'varchar', length:bytes.kB})
	team1: string;

	@Column({type:'varchar', length:bytes.kB})
	team2: string;

	@Column({ nullable: true })
	team1Score: number;

	@Column({ nullable: true })
	team2Score: number;

	@Column({type:'double'})
	quote1: number;

	@Column({ nullable: true, type:'double' })
	quotex: number;

	@Column({type:'double'})
	quote2: number;

	@Column()
	game: Game;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: string;
}
