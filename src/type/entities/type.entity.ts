import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Column, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  wording: string;

  @Column({ nullable: false })
  picture: string;

  // @ManyToMany(() => Pokemon, (pokemon) => pokemon.type,{eager:false})
  // pokemon: Pokemon[];
}
