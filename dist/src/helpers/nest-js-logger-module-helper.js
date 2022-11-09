"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinstonSettingsForRoot = void 0;
const winston = __importStar(require("winston"));
const getWinstonFormattersByEnvHelper = () => {
    const formatters = [winston.format.timestamp(), winston.format.json()];
    if (process.env.APPLICATION_ENV === 'production' || process.env.APPLICATION_ENV === 'staging') {
        const newrelicFormatter = require('@newrelic/winston-enricher');
        return [...formatters, newrelicFormatter()];
    }
    if (process.env.APPLICATION_ENV === 'development') {
        return [
            ...formatters,
            winston.format.prettyPrint({
                depth: 5,
                colorize: true,
            }),
        ];
    }
    return formatters;
};
const getDefaultWinstonConfiguration = () => {
    return {
        levels: {
            emergency: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5,
        },
        silent: process.env.APPLICATION_ENV === 'test',
        level: process.env.APPLICATION_ENV === 'development' ? 'debug' : 'info',
        format: winston.format.combine(...getWinstonFormattersByEnvHelper()),
        defaultMeta: {
            service_name: process.env.NEW_RELIC_APPLICATION_NAME,
        },
        transports: [new winston.transports.Console()],
    };
};
const getWinstonSettingsForRoot = (winstonModuleOptions) => {
    if (winstonModuleOptions) {
        return winstonModuleOptions;
    }
    const defaultWinstonConfiguration = getDefaultWinstonConfiguration();
    return defaultWinstonConfiguration;
};
exports.getWinstonSettingsForRoot = getWinstonSettingsForRoot;
