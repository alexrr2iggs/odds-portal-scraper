import { Entity, Column, Unique, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { CrawlSession } from "./crawl-session.js";



@Entity()
export class CrawlSessionReccord {
    @PrimaryGeneratedColumn()
    ID: number;

    @ManyToOne(() => CrawlSession, crawlSession => crawlSession.reccords, { cascade: true, onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn()
    crawlSession: CrawlSession;

    @Column()
    league: string;

    @Creatimport { Entity, Column, Unique, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { CrawlSession } from "./crawl-session.js";



@Entity()
export class CrawlSessionReccord {
    @PrimaryGeneratedColumn()
    ID: number;

    @ManyToOne(() => CrawlSession, crawlSession => crawlSession.reccords, { cascade: true, onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn()
    crawlSession: CrawlSession;

    @Column()
    league: string;

    @CreateDateColumn({ default: new Date().toISOString() })
    createdAt?: string;
}