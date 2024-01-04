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
import { CreateCaptureDto } from 'src/capture/dto/create-capture.dto';
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

  async capturePokemon(captureDto: CreateCaptureDto): Promise<void> {
    const { id_pokemon, id_trainer } = captureDto;

    const pokemon = await this.pokemonRepository.findOne({
      where: { pokedexid: id_pokemon },
      relations: ['trainer'],
    });

    const trainer = await this.trainerRepository.findOne({
      where: { id: id_trainer },
      relations: ['pokemon'],
    });

    if (pokemon && trainer) {
      // Vérifie si le Pokémon n'est pas déjà capturé par ce dresseur
      const isCaptured = trainer.pokemon.some(
        (capturedPokemon) => capturedPokemon.pokedexid === id_pokemon,
      );

      if (!isCaptured) {
        // Ajoute le Pokémon à la liste du dresseur
        trainer.pokemon.push(pokemon);
        pokemon.trainer.push(trainer);

        // Mis à jour la base de données
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
  async getPokemonsByTrainer(trainerId: number): Promise<Pokemon[]> {
    const trainer = await this.trainerRepository.findOne({
      where: { id: trainerId },
      relations: ['pokemon'],
    });

    if (trainer) {
      return trainer.pokemon;
    } else {
      throw new NotFoundException(`Trainer with id ${trainerId} not found`);
    }
  }
  async getGamesByCapturedPokemon(pokemonId: number): Promise<string[]> {
    const query = `
      SELECT game.wording
      FROM public.pokemon
      LEFT JOIN public.capture ON pokemon.pokedexid = capture.id_pokemon
      LEFT JOIN public.comefrom ON capture.id = comefrom.id_capture
      LEFT JOIN public.game ON comefrom.id_game = game.id
      WHERE pokemon.pokedexid = $1
    `;

    const results = await this.pokemonRepository.query(query, [pokemonId]);

    return results.map((result) => result.wording);
  }
}
