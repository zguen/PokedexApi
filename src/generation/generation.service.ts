import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Generation } from './entities/generation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenerationService {

  constructor(
    @InjectRepository(Generation) private generationRepository: Repository<Generation>
  ) {}

  async create(createGenerationDto: CreateGenerationDto) {
    const generation = this.generationRepository.create(createGenerationDto);
    const result = this.generationRepository.save(generation);
    return result;
  }

  findAll() {
    return this.generationRepository.find();
  }

  async findOne(id: number) {
    const found = await this.generationRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Pas de generation ${id}`);
    }
    return found;;
  }
}
