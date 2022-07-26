import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Game } from '../types/sport.js';
import { CrawlSessionReccord } from './crawl-session-reccord.js';

@Entity()
export class CrawlSession {
	@PrimaryGeneratedColumn()
	ID?: number;

	@OneToMany(() => CrawlSessionReccord, reccord => reccord.crawlSession)
	@JoinColumn()
	reccords?: CrawlSessionReccord[];

	@Column({ nullable: true })
	game?: Game;

	@Column()
	start?: string;

	@Column()
	end?: string;

	@Column({ default: 0 })
	totInserted?: number;

	@Column({ default: 0 })
	totLeagues?: number;

	@CreateDateColumn({ default: new Date().toISOString() })
	createdAt?: number;

	@UpdateDateColumn({ default: new Date().toISOString() })
	updatedAt?: string;
}

export function scrapSessiontoString(cs: CrawlSession): string {
	return 'createdAt: ' + cs.createdAt + ', game: ' + cs.game + ', start: ' + cs.start + ', end: ' + cs.end + ', totInserted: ' + cs.totInserted + ', totLeagues: ' + cs.totLeagues;
}
