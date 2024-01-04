import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Game } from 'src/game/entities/game.entity';

@Entity('capture')
export class Capture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_trainer: number;

  @Column()
  id_pokemon: number;

  @ManyToMany(() => Game, (game) => game.capture, { eager: true })
  @JoinTable({
    name: 'comefrom',
    joinColumn: { name: 'id_capture', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_game', referencedColumnName: 'id' }
  })
  games: Game[]
}
