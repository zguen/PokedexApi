import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post()
  create(@Body() createGenerationDto: CreateGenerationDto) {
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
}
