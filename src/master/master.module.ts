import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './entities/master.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Master]),
  ],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}
