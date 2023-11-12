import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaptureService } from './capture.service';
import { CaptureDto } from './dto/capture.dto';


@Controller('capture')
export class CaptureController {
  constructor(private readonly captureService: CaptureService) {}

  @Post()
  create(@Body() createCaptureDto: CaptureDto) {
    return this.captureService.create(createCaptureDto);
  }

  @Get()
  findAll() {
    return this.captureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.captureService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.captureService.remove(+id);
  }
}
