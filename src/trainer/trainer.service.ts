import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto, id_master: number) {
    const trainer = this.trainerRepository.create(createTrainerDto);
    trainer.id_master = id_master;
    const result = await this.trainerRepository.save(trainer);
    return result;
  }

  async findTrainerByIdMaster(id_master: number): Promise<Trainer[]> {
    const found = await this.trainerRepository.find({
      where: { id_master },
    });

    if (!found) {
      throw new NotFoundException(`Aucun dresseur n'est relié à ce Maitre.`);
    }
    return found;
  }

  async findOne(idTrainer: number, idMaster: number) {
    const found = await this.trainerRepository.findOneBy({ id: idTrainer });

    if (!found) {
      throw new NotFoundException(`Pas d'entraineur avec cet id ${idTrainer}`)
    }

    if (found.id_master !== idMaster) {
      throw new ForbiddenException(`Vous n'avez pas les droits sur cet entraineur`);
    }
    return found;
  }

  async update(idTrainer: number, updateTrainerDto: UpdateTrainerDto, idMaster: number) {
    const trainer = await this.findOne(idTrainer, idMaster);

    const updateTrainer = this.trainerRepository.merge(trainer, updateTrainerDto);

    const result = await this.trainerRepository.save(updateTrainer);
    return result;
  }

  async remove(idTrainer: number, idMaster: number) {
    const trainer = await this.findOne(idTrainer, idMaster);
    await this.trainerRepository.remove(trainer);
    return `Le dresseur a pris sa retraite`;
  }
}
