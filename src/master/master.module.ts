import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Master } from './entities/master.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Master]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}
