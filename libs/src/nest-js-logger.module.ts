import { DynamicModule, Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';

import { getWinstonSettingsForRoot } from './helpers';
import { NestJsLoggerService } from './nest-js-logger.service';


@Module({
  imports: [
    WinstonModule.forRoot(getWinstonSettingsForRoot())
  ],
  providers: [NestJsLoggerService],
  exports: [NestJsLoggerService],
})
export class NestJsLoggerModule {
  public static forRoot(options?: WinstonModuleOptions): DynamicModule {
    const winstonSettings = getWinstonSettingsForRoot(options)
    return {
      module: NestJsLoggerModule,
      imports: [WinstonModule.forRoot(winstonSettings)],
      providers: [NestJsLoggerService],
      exports: [NestJsLoggerService],
    }
  }
}
