import {
  Controller,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Get('confirm-email')
  async confirmEmail(@Query('token') confirmToken: string) {
    try {
      await this.authService.confirmEmail(confirmToken);
      return { message: 'E-mail confirmé avec succès!' };
    } catch (error) {
      return { error: "Erreur lors de la confirmation de l'e-mail" };
    }
  }
}
