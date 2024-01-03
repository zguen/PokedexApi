import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class GameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;
}