import { Module } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationController } from './generation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generation } from './entities/generation.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Generation]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GenerationController],
  providers: [GenerationService],
})
export class GenerationModule {}
