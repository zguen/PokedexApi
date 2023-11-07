import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtTrainerStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
  async validate(payload: any): Promise<Trainer> {
    console.log('validate');
    const { nickname } = payload;
    const user: Trainer = await this.trainerRepository.findOneBy({ nickname });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
