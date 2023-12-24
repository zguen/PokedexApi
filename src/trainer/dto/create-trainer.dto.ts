import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, Matches, isNotEmpty } from "class-validator";

export class CreateTrainerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_master: number;
}
