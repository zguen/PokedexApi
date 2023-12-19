import {
  BadRequestException,
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
    const { lastname, firstname, email, password, admin } = createAuthDto;

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
    });

    try {
      //enregistrement entité master
      const createdMaster = await this.masterRepository.save(master);

      const confirmToken = this.jwtService.sign(
        { userId: createdMaster.id },
        { expiresIn: '2h' },
      );

      master.confirmtoken = confirmToken;

      createdMaster.confirmtoken = confirmToken;
      await this.masterRepository.save(createdMaster);

      const confirmationLink = `https://pokedexjunior.fr/auth/confirm-email?token=${confirmToken}`;

      await this.mailerSenderService.sendConfirmationEmail(
        createdMaster.email,
        confirmationLink,
      );

      delete createdMaster.password;
      return createdMaster;
    } catch (error) {
      // Gestion des erreurs
      console.error('Error during registration:', error);

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

  async confirmEmail(confirmtoken: string): Promise<void> {
   
    const user = await this.masterRepository.findOneBy({ confirmtoken });

    // Vérification du token
    if (user) {
      user.isverified = true;

      user.confirmtoken = null;

      await this.masterRepository.save(user);
    } else {
      // Token invalide ou jeton expiré
      throw new BadRequestException('Token de confirmation invalide');
    }
  }
}
