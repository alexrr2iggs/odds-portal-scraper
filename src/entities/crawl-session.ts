import { bytes } from 'iggs-utils';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';
import { Game } from '../types/sport.js';
import { CrawlSessionReccord } from './crawl-session-reccord.js';

export enum SessionCreator{
	SYSTEM='SYSTEM',
	USER='USER'
}


const gamesTransformer: ValueTransformer = {
	to: function (games: Game[]) {
		return JSON.stringify(games);
	},
	from: function (value: string) {
		return JSON.parse(value);
	}
};

@Entity()
export class CrawlSession {
	@PrimaryGeneratedColumn()
	ID?: number;

	@OneToMany(() => CrawlSessionReccord, reccord => reccord.crawlSession)
	@JoinColumn()
	reccords?: CrawlSessionReccord[];

	@Column({ type: 'varchar', length: 3 * bytes.kB, transformer: gamesTransformer })
	games?: Game[];

	@Column()
	start?: string;

	@Column()
	end?: string;

	@Column({ default: 0 })
	totInserted?: number;

	@Column({ default: 0 })
	totLeagues?: number;

	@Column()
	createdBy:SessionCreator

	@Column({default:false})
	complete:boolean

	@Column({default:new Date().toISOString()})
	createdAt?: string;

	@Column({default:new Date().toISOString()})
	updatedAt?: string;


}

export function scrapSessiontoString(cs: CrawlSession): string {
	return 'createdAt: ' + cs.createdAt + ', game: ' + cs.games + ', start: ' + cs.start + ', end: ' + cs.end + ', totInserted: ' + cs.totInserted + ', totLeagues: ' + cs.totLeagues;
}
