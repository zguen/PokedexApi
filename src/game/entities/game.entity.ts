import { Capture } from "src/capture/entities/capture.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  wording: string;

  @OneToMany(() => Capture, (capture) => capture.game_id)
  captures: Capture[];
}
