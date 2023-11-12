import { Module, forwardRef } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon } from './entities/pokemon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { TrainerModule } from 'src/trainer/trainer.module';
import { Trainer } from 'src/trainer/entities/trainer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon, Trainer]),
    forwardRef(() => TrainerModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
