import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  wording: string;

  @Column({ nullable: false })
  picture: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.type,{eager:false})
  pokemon: Pokemon[];
}