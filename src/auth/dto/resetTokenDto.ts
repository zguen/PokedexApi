import { IsEmail } from "class-validator";


export class ResetTokenDto {
  @IsEmail()
  email: string;
}