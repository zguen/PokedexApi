import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { GameDto } from 'src/game/dto/game.dto';
import { Game } from 'src/game/entities/game.entity';

export class CreateCaptureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_trainer: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_pokemon: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GameDto)
  games?: Game[];
}
