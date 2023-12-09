import { Test, TestingModule } from '@nestjs/testing';
import { MailerSenderService } from './mailer-sender.service';

describe('MailerSenderService', () => {
  let service: MailerSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerSenderService],
    }).compile();

    service = module.get<MailerSenderService>(MailerSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
