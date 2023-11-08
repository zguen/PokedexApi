import { Module } from '@nestjs/common';
import { AuthTrainerService } from './auth-trainer.service';
import { AuthTrainerController } from './auth-trainer.controller';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthTrainerController],
  providers: [AuthTrainerService],
  exports: [PassportModule],
})
export class AuthTrainerModule {}
