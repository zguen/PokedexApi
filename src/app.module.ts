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
import { Master } from './master/entities/master.entity';
import { Trainer } from './trainer/entities/trainer.entity';
import { Pokemon } from './pokemon/entities/pokemon.entity';
import { Type } from './type/entities/type.entity';
import { Generation } from './generation/entities/generation.entity';
import { AuthModule } from './auth/auth.module';

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
      entities: [Master, Trainer, Pokemon, Type,Generation],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
