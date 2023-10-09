import { Module } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationController } from './generation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generation } from './entities/generation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Generation])],
  controllers: [GenerationController],
  providers: [GenerationService],
})
export class GenerationModule {}
