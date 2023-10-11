import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Master } from './entities/master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Master)
  private masterRepository: Repository < Master>)
   { }

  async findOne(id: number) {
    const found = await this.masterRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Master with the id ${id} not found`);
    }
    return found;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }
}
