import { Column, PrimaryColumn } from 'typeorm';

export class Pokemon {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    picture: string;

    @Column({type:'int'})
    pre_evolution: number;

    @Column()
    height: string;

    @Column()
    weight: string;

    @Column({ nullable: false, type:'int' })
    id_generation: number;

}
