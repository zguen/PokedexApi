import { Injectable } from '@nestjs/common';
import { CaptureDto } from './dto/capture.dto';


@Injectable()
export class CaptureService {
  create(createCaptureDto: CaptureDto) {
    return 'This action adds a new capture';
  }

  findAll() {
    return `This action returns all capture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} capture`;
  }

  update(id: number, updateCaptureDto: CaptureDto) {
    return `This action updates a #${id} capture`;
  }

  remove(id: number) {
    return `This action removes a #${id} capture`;
  }
}
