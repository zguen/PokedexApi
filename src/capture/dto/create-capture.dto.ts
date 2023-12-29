import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, isPositive } from "class-validator";

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
  @IsInt()
  @IsPositive()
  game_id?: number;

  @ApiProperty()
  @IsString()
  nickname?: string;
}
