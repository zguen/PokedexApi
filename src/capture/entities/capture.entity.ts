import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Game } from 'src/game/entities/game.entity';

@Entity('capture')
export class Capture {
  @PrimaryColumn()
  id_trainer: number;

  @PrimaryColumn()
  id_pokemon: number;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true, type: 'int' })
  game_id: number;

  @ManyToOne(() => Game, { eager: true })
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
