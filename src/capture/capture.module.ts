import { Module } from '@nestjs/common';
import { CaptureService } from './capture.service';
import { CaptureController } from './capture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capture } from './entities/capture.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Capture])],
  controllers: [CaptureController],
  providers: [CaptureService],
})
export class CaptureModule {}
