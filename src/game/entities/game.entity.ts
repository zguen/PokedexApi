import { Capture } from "src/capture/entities/capture.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  wording: string;

  @ManyToMany(() => Capture, (capture) => capture.games, { eager: false })
  capture: Capture[]
}
