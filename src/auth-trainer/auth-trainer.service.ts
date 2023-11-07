import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthTrainerDto } from './dto/create-auth-trainer.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthTrainerService {

  constructor(@InjectRepository(Trainer) private trainerRepository: Repository<Trainer>) { }
  
  async register(createAuthTrainerDto: CreateAuthTrainerDto) {
    const { nickname, firstname, id_master, password } = createAuthTrainerDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const trainer = this.trainerRepository.create({
      nickname,
      firstname,
      id_master,
      password: hashedPassword
    });

    try {
      const createdTrainer = await this.trainerRepository.save(trainer);
      delete createdTrainer.password;
      return createdTrainer;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ce dresseur existe déjà');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

}
