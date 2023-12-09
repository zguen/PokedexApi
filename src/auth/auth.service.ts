import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Master } from 'src/master/entities/master.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerSenderService } from 'src/mailer-sender/mailer-sender.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Master)
    private masterRepository: Repository<Master>,
    private jwtService: JwtService,
    private mailerSenderService: MailerSenderService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { lastname, firstname, email, password, admin, confirmToken } =
      createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //création entité master
    const master = this.masterRepository.create({
      lastname,
      firstname,
      email,
      password: hashedPassword,
      admin,
      confirmToken,
    });

    try {
      //enregistrement entité master
      const createdMaster = await this.masterRepository.save(master);

      const confirmToken = this.jwtService.sign(
        { userId: createdMaster.id },
        { expiresIn: '2h' },
      );

      console.log(typeof confirmToken);

      // if (confirmToken) {
      //   createdMaster.confirmToken = confirmToken;
      //   await this.masterRepository.save(createdMaster);
      // }

      const confirmationLink = `URL_de_confirmation?token=${confirmToken}`;
      await this.mailerSenderService.sendConfirmationEmail(
        createdMaster.email,
        confirmationLink,
      );

      delete createdMaster.password;
      return createdMaster;
    } catch (error) {
      //gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('Cet email est déjà utilisé');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const master = await this.masterRepository.findOneBy({ email });

    if (master && (await bcrypt.compare(password, master.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }
}
