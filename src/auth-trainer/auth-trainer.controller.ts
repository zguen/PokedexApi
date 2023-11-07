import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthTrainerService } from './auth-trainer.service';
import { CreateAuthTrainerDto } from './dto/create-auth-trainer.dto';
import { LoginTrainerDto } from './dto/login-trainer.dto';

@Controller('auth-trainer')
export class AuthTrainerController {
  constructor(private readonly authTrainerService: AuthTrainerService) {}

  @Post('register')
  create(@Body() createAuthTrainerDto: CreateAuthTrainerDto) {
    return this.authTrainerService.register(createAuthTrainerDto);
  }

  @Post('/login')
  login(@Body() loginTrainerDto: LoginTrainerDto): Promise<{ accessToken: string }> {
    return this.authTrainerService.login(loginTrainerDto);
  }
}
