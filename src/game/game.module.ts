import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
