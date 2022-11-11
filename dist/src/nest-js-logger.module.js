"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestJsLoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestJsLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const helpers_1 = require("./helpers");
const nest_js_logger_service_1 = require("./nest-js-logger.service");
let NestJsLoggerModule = NestJsLoggerModule_1 = class NestJsLoggerModule {
    static forRoot(options) {
        const winstonSettings = (0, helpers_1.getWinstonSettingsForRoot)(options);
        return {
            module: NestJsLoggerModule_1,
            imports: [nest_winston_1.WinstonModule.forRoot(winstonSettings)],
            providers: [nest_js_logger_service_1.NestJsLoggerService],
            exports: [nest_js_logger_service_1.NestJsLoggerService],
        };
    }
};
NestJsLoggerModule = NestJsLoggerModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot((0, helpers_1.getWinstonSettingsForRoot)())
        ],
        providers: [nest_js_logger_service_1.NestJsLoggerService],
        exports: [nest_js_logger_service_1.NestJsLoggerService],
    })
], NestJsLoggerModule);
exports.NestJsLoggerModule = NestJsLoggerModule;
