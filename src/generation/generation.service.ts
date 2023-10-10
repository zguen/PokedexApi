import { Injectable } from '@nestjs/common';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Generation } from './entities/generation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenerationService {

  constructor(
    @InjectRepository(Generation) private generationRepository: Repository<Generation>
  ) {}

  create(createGenerationDto: CreateGenerationDto) {
    return 'This action adds a new generation';
  }

  findAll() {
    return this.generationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} generation`;
  }
}
