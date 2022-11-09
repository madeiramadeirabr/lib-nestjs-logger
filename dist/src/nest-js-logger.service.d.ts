import { LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
export declare class NestJsLoggerService implements LoggerService {
    private readonly logger;
    constructor(logger: Logger);
    protected context?: string;
    private _trackId;
    get trackId(): string;
    set trackId(value: string);
    private formatContent;
    private getErrorStack;
    error(message: any, context?: string): void;
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    private createTrackId;
}
//# sourceMappingURL=nest-js-logger.service.d.ts.map