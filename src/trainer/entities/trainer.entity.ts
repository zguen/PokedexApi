import { Master } from 'src/master/entities/master.entity';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Trainer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    firstName: string;
    @Column()
    nickName: string;
    @Column({ nullable: false, type: 'int' })
    id_master: number;

    @ManyToMany(() => Pokemon, (pokemon) => pokemon.trainer, { eager: true })
    pokemon: Pokemon[];

    @ManyToOne(() => Master, (master) => master.trainer, {
        eager: true,
    })
    @JoinColumn({ name: 'id_master' })
    master: Master;
}
