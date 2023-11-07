import { Module } from '@nestjs/common';
import { AuthTrainerService } from './auth-trainer.service';
import { AuthTrainerController } from './auth-trainer.controller';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [AuthTrainerController],
  providers: [AuthTrainerService],
})
export class AuthTrainerModule {}
