import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Master {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  lastname: string;
  @Column({ nullable: false })
  firstname: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  admin: boolean;
  @Column({ nullable: true })
  confirmtoken: string;
  @Column({ default: false })
  isverified: boolean;
  @Column({ nullable: true })
  resettoken: string;

  @OneToMany(() => Trainer, (trainer) => trainer.masters, { eager: true })
  trainers: Trainer[];
}
