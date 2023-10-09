import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Master {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    lastName: string;
    @Column({ nullable: false })
    firstName: string;
    @Column()
    nickName: string;
    @Column({ nullable: false, unique: true })
    email: string;
    @Column({ nullable: false })
    password: string;
    @Column({ nullable: false })
    admin: boolean;
}
