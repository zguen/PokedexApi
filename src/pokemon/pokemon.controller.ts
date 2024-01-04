import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Master } from 'src/master/entities/master.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateCaptureDto } from 'src/capture/dto/create-capture.dto';

@Controller('pokemon')
@ApiTags('Pokemons Controller')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createPokemonDto: CreatePokemonDto,
    @GetUser() master: Master,
  ) {
    if (!master.admin) {
      throw new UnauthorizedException(`Droits d'administrateur nécéssaires`);
    }
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pokemonService.findOne(id);
  }

  @Get('by-trainer/:trainerId')
  async getPokemonsByTrainer(@Param('trainerId') trainerId: number) {
    try {
      const pokemons =
        await this.pokemonService.getPokemonsByTrainer(trainerId);
      return pokemons;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Get(':pokemonId/games')
  async getGamesByCapturedPokemon(
    @Param('pokemonId') pokemonId: string,
  ): Promise<string[]> {
    return this.pokemonService.getGamesByCapturedPokemon(+pokemonId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @GetUser() master: Master,
  ) {
    if (!master.admin) {
      throw new UnauthorizedException(`Droits d'administrateur nécéssaires`);
    }
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @GetUser() master: Master) {
    if (!master.admin) {
      throw new UnauthorizedException(`Droits d'administrateur nécéssaires`);
    }
    return this.pokemonService.remove(+id);
  }

  @Post('/capture')
  capturePokemon(@Body() createCaptureDto: CreateCaptureDto): Promise<void> {
    return this.pokemonService.capturePokemon(createCaptureDto);
  }
}