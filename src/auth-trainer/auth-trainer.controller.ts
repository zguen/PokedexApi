import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthTrainerService } from './auth-trainer.service';
import { CreateAuthTrainerDto } from './dto/create-auth-trainer.dto';

@Controller('auth-trainer')
export class AuthTrainerController {
  constructor(private readonly authTrainerService: AuthTrainerService) {}

  @Post('register')
  create(@Body() createAuthTrainerDto: CreateAuthTrainerDto) {
    return this.authTrainerService.register(createAuthTrainerDto);
  }
}
