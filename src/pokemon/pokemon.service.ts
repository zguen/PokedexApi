import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Repository } from 'typeorm';
import { CaptureDto } from 'src/capture/dto/capture.dto';
import { Trainer } from 'src/trainer/entities/trainer.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Trainer) private trainerRepository: Repository<Trainer>,
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

  async capturePokemon(captureDto: CaptureDto): Promise<void> {
    const { id_pokemon, id_trainer, nickname, game } = captureDto;

    const pokemon = await this.pokemonRepository.findOne({
      where: { pokedexid: id_pokemon },
      relations: ['trainer'],
    });

    const trainer = await this.trainerRepository.findOne({
      where: { id: id_trainer },
      relations: ['pokemon'],
    });

    if (pokemon && trainer) {
      // Vérifiez si le Pokémon n'est pas déjà capturé par le dresseur
      const isCaptured = trainer.pokemon.some(
        (capturedPokemon) => capturedPokemon.pokedexid === id_pokemon,
      );

      if (!isCaptured) {
        // Ajoutez le Pokémon à la liste du dresseur avec les détails supplémentaires
        trainer.pokemon.push(pokemon);
        pokemon.trainer.push(trainer);

        // Mettez à jour la base de données
        await this.trainerRepository.save(trainer);
        await this.pokemonRepository.save(pokemon);
      } else {
        throw new ConflictException(
          'This Pokemon is already captured by the Trainer',
        );
      }
    } else {
      throw new NotFoundException('Pokemon or Trainer not found');
    }
  }
}
