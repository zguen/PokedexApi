import {
  Controller,
  Param,
  Body,
  Patch,
  NotFoundException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CaptureService } from './capture.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('capture')
@ApiTags('Capture Controller')
export class CaptureController {
  constructor(private readonly captureService: CaptureService) {}

  @Patch(':trainerId/:pokemonId')
  @UseGuards(AuthGuard())
  async updateCapture(
    @Param('trainerId') trainerId: number,
    @Param('pokemonId') pokemonId: number,
    @Body() updateCaptureDto: UpdateCaptureDto,
  ) {
    try {
      const updatedCapture = await this.captureService.updateCaptureInfo(
        trainerId,
        pokemonId,
        updateCaptureDto,
      );

      return {
        message: 'Capture updated successfully',
        capture: updatedCapture,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          message: 'Capture not found',
        };
      }

      return {
        message: 'Error updating capture',
        error: error.message,
      };
    }
  }

  @Get('is-captured/:trainerId/:pokemonId')
  async isPokemonCaptured(
    @Param('trainerId') trainerId: number,
    @Param('pokemonId') pokemonId: number,
  ) {
    try {
      const captured = await this.captureService.isPokemonCaptured(
        trainerId,
        pokemonId,
      );

      return {
        captured,
      };
    } catch (error) {
      return {
        message: 'Error checking capture status',
        error: error.message,
      };
    }
  }
}
