import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type) private typeRepository: Repository<Type>,
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    const type = this.typeRepository.create(createTypeDto);
    const result = this.typeRepository.save(type);
    return result;
  }

  findAll() {
    return this.typeRepository.find();
  }
}
