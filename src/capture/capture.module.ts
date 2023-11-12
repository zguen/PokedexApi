import { Module } from '@nestjs/common';
import { CaptureService } from './capture.service';
import { CaptureController } from './capture.controller';

@Module({
  controllers: [CaptureController],
  providers: [CaptureService],
})
export class CaptureModule {}
