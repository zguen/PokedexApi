import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './master/master.module';
import { TrainerModule } from './trainer/trainer.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeModule } from './type/type.module';
import { GenerationModule } from './generation/generation.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Master } from './master/entities/master.entity';
import { Trainer } from './trainer/entities/trainer.entity';
import { Pokemon } from './pokemon/entities/pokemon.entity';
import { Type } from './type/entities/type.entity';
import { Generation } from './generation/entities/generation.entity';
import { AuthTrainerModule } from './auth-trainer/auth-trainer.module';
import { CaptureModule } from './capture/capture.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerSenderService } from './mailer-sender/mailer-sender.service';
import { GameModule } from './game/game.module';
import { Capture } from './capture/entities/capture.entity';
import { Game } from './game/entities/game.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    MasterModule,
    TrainerModule,
    PokemonModule,
    TypeModule,
    GenerationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Master, Trainer, Pokemon, Type, Generation, Game, Capture],
      synchronize: false,
    }),
    AuthModule,
    AuthTrainerModule,
    CaptureModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerSenderService],
})
export class AppModule {}
