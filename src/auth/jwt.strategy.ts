import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Master } from 'src/master/entities/master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Master)
    private masterRepository: Repository<Master>,
  ) {
    super({
      secretOrKey: 'bipbipouai',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
  async validate(payload: any): Promise<Master> {
    console.log('validate');
    const { email } = payload;
    const master: Master = await this.masterRepository.findOneBy({ email });

    if (!master) throw new UnauthorizedException();
    return master;
  }
}
