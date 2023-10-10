import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateTrainerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id_master: number;

}
