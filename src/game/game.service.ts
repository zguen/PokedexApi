import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  findAll() {
    return this.gameRepository.find();
  }

  async findOne(id: number) {
    const found = await this.gameRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Pas de jeu ${id}`);
    }
    return found;
  }
}
