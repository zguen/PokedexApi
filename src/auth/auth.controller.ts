import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
  InternalServerErrorException,
  Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Get('confirm')
  async confirmEmail(@Query('token') confirmtoken: string, @Res() res) {
    try {
      // Vérifier si le token est fourni
      if (!confirmtoken) {
        throw new BadRequestException('Le token de confirmation est requis');
      }

      // Confirmer l'e-mail avec le token
      await this.authService.confirmEmail(confirmtoken);

      // Succès
      return res.redirect('https://pokedexjunior.fr/validationmail');
    } catch (error) {
      // Gestion des différentes erreurs possibles
      if (error instanceof BadRequestException) {
        // Erreur de requête client (par exemple, token manquant)
        throw error;
      } else {
        // Erreur interne du serveur avec détails spécifiques
        throw new InternalServerErrorException(`Une erreur est survenue lors de la confirmation de l'e-mail : ${error.message}`);
      }
    }
  }
}
