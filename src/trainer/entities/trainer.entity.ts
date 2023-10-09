import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Trainer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    firstName: string;
    @Column()
    nickName: string;
    @Column({ nullable: false, type: 'int' })
    id_master: number;
}
