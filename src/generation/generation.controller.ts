import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Master } from 'src/master/entities/master.entity';


@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createGenerationDto: CreateGenerationDto,
    @GetUser() master: Master,
  ) {
    if (!master.admin) {
      throw new UnauthorizedException(`Droits d'administrateur nécéssaires`);
    }
    return this.generationService.create(createGenerationDto);
  }

  @Get()
  findAll() {
    return this.generationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generationService.findOne(+id);
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @GetUser() master: Master) {
    if (!master.admin) {
      throw new UnauthorizedException(`Droits d'administrateur nécéssaires`);
    }
    return this.generationService.remove(+id);
  }
}
