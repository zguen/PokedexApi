import { Master } from 'src/master/entities/master.entity';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trainer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    firstname: string;
    @Column()
    nickname: string;
    @Column({ nullable: false, type: 'int' })
    id_master: number;

    @ManyToMany(() => Pokemon, (pokemon) => pokemon.trainer, { eager: true })
    pokemon: Pokemon[];

    @ManyToOne(() => Master, (master) => master.trainers, {
        eager: true,
    })
    @JoinColumn({ name: 'id_master' })
    masters: Master;
}
