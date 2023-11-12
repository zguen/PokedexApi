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
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Master } from 'src/master/entities/master.entity';
import { ApiTags } from '@nestjs/swagger';
import { CaptureDto } from 'src/capture/dto/capture.dto';

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
  capturePokemon(@Body() captureDto: CaptureDto): Promise<void> {
    console.log('Capture Pokemon endpoint reached');
    return this.pokemonService.capturePokemon(captureDto);
  }
}
