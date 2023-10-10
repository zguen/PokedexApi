import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateTrainerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nickName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id_master: number;

}
