import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Generation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  wording: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.generation)
  pokemon: Pokemon[];
}
