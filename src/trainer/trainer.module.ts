import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
