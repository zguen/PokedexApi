import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  isBoolean,
  isNotEmpty,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\.]).{12,}$/)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;
}
