import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MasterService } from './master.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Master } from './entities/master.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('master')
@ApiTags('Master Controller')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get() //pour que l'utilisateur puisse accéder à son profil
  @UseGuards(AuthGuard())
  findOne(@GetUser() master: Master) {
    return this.masterService.findOne(master.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(+id);
  }
}
