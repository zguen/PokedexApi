import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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

  @ApiProperty({ required: false }) 
  @IsOptional() 
  @IsInt()
  @IsPositive()
  game_id?: number;
}
