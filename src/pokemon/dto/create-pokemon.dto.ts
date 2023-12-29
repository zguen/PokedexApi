import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeDto } from 'src/type/dto/type.dto';
import { Type as TypeEntity} from 'src/type/entities/type.entity';

export class CreatePokemonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  pokedexid: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  pre_evolution: number;

  @ApiProperty()
  @IsString()
  height: string;

  @ApiProperty()
  @IsString()
  weight: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_generation: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TypeDto) //
  types: TypeEntity[];
}
