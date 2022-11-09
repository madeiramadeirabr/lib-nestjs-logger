import { Format } from 'logform';
import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';
export declare const getWinstonSettingsForRoot: (winstonModuleOptions?: WinstonModuleOptions) => WinstonModuleOptions | {
    levels: {
        emergency: number;
        error: number;
        warn: number;
        info: number;
        debug: number;
        trace: number;
    };
    silent: boolean;
    level: string;
    format: Format;
    defaultMeta: {
        service_name: string;
    };
    transports: winston.transports.ConsoleTransportInstance[];
};
