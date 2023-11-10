import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthTrainerService } from './auth-trainer.service';
import { CreateAuthTrainerDto } from './dto/create-auth-trainer.dto';
import { LoginTrainerDto } from './dto/login-trainer.dto';
import { Trainer } from 'src/trainer/entities/trainer.entity';

@Controller('auth-trainer')
export class AuthTrainerController {
  constructor(private readonly authTrainerService: AuthTrainerService) {}

  @Post('register')
  create(@Body() createAuthTrainerDto: CreateAuthTrainerDto) {
    return this.authTrainerService.register(createAuthTrainerDto);
  }

  @Post('/login')
  async login(
    @Body() loginTrainerDto: LoginTrainerDto,
  ): Promise<{ trainer: Trainer }> {
    const loginResponse = await this.authTrainerService.login(loginTrainerDto);
    return { trainer: loginResponse.trainer };
  }
}
