import { Master } from 'src/master/entities/master.entity';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;
  @Column()
  password: string;

  @Column({ nullable: false, type: 'int' })
  id_master: number;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.trainer, { eager: true })
  pokemon: Pokemon[];

  @ManyToOne(() => Master, (master) => master.trainers)
  @JoinColumn({ name: 'id_master' })
  masters: Master;
}
