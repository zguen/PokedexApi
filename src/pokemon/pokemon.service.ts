import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    if (createPokemonDto.types.length > 2) {
      throw new BadRequestException('A Pokemon can have at most 2 types.');
    }
    const pokemon = this.pokemonRepository.create(createPokemonDto);
    const result = await this.pokemonRepository.save(pokemon);
    return result;
  }

  findAll() {
    return this.pokemonRepository.find();
  }

  async findOne(pokedexid: number) {
    const found = await this.pokemonRepository.findOneBy({ pokedexid });
    if (!found) {
      throw new NotFoundException(`Pokemon with the id ${pokedexid} not found`);
    }
    return found;
  }

  async update(pokedexid: number, updatePokemonDto: UpdatePokemonDto) {
    let Pokemon = await this.findOne(pokedexid);

    if (updatePokemonDto.types) {
      if (updatePokemonDto.types.length > 2) {
        throw new BadRequestException('A Pokemon can have at most 2 types.');
      }
      Pokemon.types = updatePokemonDto.types;
    }

    if (updatePokemonDto.id_generation) {
      Pokemon.id_generation = updatePokemonDto.id_generation;
    }

    const updatedPokemon = this.pokemonRepository.merge(
      Pokemon,
      updatePokemonDto,
    );
    const result = await this.pokemonRepository.save(updatedPokemon);
    return result;
  }

  async remove(pokedexid: number) {
    const pokemon = await this.findOne(pokedexid);
    const reponse = await this.pokemonRepository.remove(pokemon);
    return reponse;
  }
}
