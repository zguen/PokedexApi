import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class TypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(18)
    id: number;
}