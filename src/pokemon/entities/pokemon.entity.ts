import { Generation } from 'src/generation/entities/generation.entity';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Type } from 'src/type/entities/type.entity';
import {
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

export class Pokemon {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  picture: string;

  @Column({ type: 'int' })
  pre_evolution: number;

  @Column()
  height: string;

  @Column()
  weight: string;

  @Column({ nullable: false, type: 'int' })
  id_generation: number;

  @ManyToOne(() => Generation, (generation) => generation.pokemon, {
    eager: true,
  })
  @JoinColumn({ name: 'id_generation' })
  generation: Generation;

  @ManyToMany(() => Type, (type) => type.pokemon, { eager: true })
  @JoinTable({
    //nécessaire que sur une des deux tables
    name: 'define', // nom de la table d'association dans BDD
    joinColumn: { name: 'id_pokemon', referencedColumnName: 'pokedexId' },
    // { name: 'nom_colonne_table_produire', referencedColumnName: 'nom_colonne_table_aliment' }
    inverseJoinColumn: { name: 'id_type', referencedColumnName: 'id' },
    // { name: 'nom_colonne_table_produire', referencedColumnName: 'nom_colonne_table_saison' }
  })
  type: Type[];

  @ManyToMany(() => Trainer, (trainer) => trainer.pokemon)
  @JoinTable({
    name: 'capture',
    joinColumn: { name: 'id_pokemon', referencedColumnName: 'pokedexId' },
    inverseJoinColumn: { name: 'id_trainer', referencedColumnName: 'id' },
  })
  trainer: Trainer[];
}
