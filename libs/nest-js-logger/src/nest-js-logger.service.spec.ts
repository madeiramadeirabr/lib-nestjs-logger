import { Test, TestingModule } from '@nestjs/testing';
import { NestJsLoggerService } from './nest-js-logger.service';

describe('NestJsLoggerService', () => {
  let service: NestJsLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestJsLoggerService],
    }).compile();

    service = module.get<NestJsLoggerService>(NestJsLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
