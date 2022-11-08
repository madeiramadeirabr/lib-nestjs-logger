import { Module } from '@nestjs/common';
import { NestJsLoggerService } from './nest-js-logger.service';

@Module({
  providers: [NestJsLoggerService],
  exports: [NestJsLoggerService],
})
export class NestJsLoggerModule {}
