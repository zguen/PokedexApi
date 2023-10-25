import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Master } from 'src/master/entities/master.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Trainer } from './entities/trainer.entity';

@Controller('trainer')
@UseGuards(AuthGuard())
@ApiTags('Trainers Controller')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  create(
    @Body() createTrainerDto: CreateTrainerDto,
    @GetUser() master: Master,
  ): Promise<Trainer> {
    return this.trainerService.create(createTrainerDto, master.id);
  }

  @Get()
  findTrainerByIdMaster(@GetUser() master: Master): Promise<Trainer[]> {
    return this.trainerService.findTrainerByIdMaster(master.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() master: Master) {
    return this.trainerService.findOne(+id, master.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
    @GetUser() master: Master,
  ) {
    return this.trainerService.update(+id, updateTrainerDto, master.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() master: Master) {
    return this.trainerService.remove(+id, master.id);
  }
}
