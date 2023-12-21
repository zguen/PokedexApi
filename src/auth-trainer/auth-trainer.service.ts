import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthTrainerDto } from './dto/create-auth-trainer.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Repository } from 'typeorm';
import { LoginTrainerDto } from './dto/login-trainer.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthTrainerService {
  constructor(
    @InjectRepository(Trainer) private trainerRepository: Repository<Trainer>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthTrainerDto: CreateAuthTrainerDto) {
    const { nickname, firstname, id_master, password } = createAuthTrainerDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const trainer = this.trainerRepository.create({
      nickname,
      id_master,
      password: hashedPassword,
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

  async login(loginTrainerDto: LoginTrainerDto) {
    const { nickname, password } = loginTrainerDto;
    const trainer = await this.trainerRepository.findOneBy({ nickname });

    if (trainer && (await bcrypt.compare(password, trainer.password))) {
      return { trainer };
    } else {
      throw new UnauthorizedException('Ces identifiants ne sont pas bons');
    }
  }
}
