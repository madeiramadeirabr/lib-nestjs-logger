"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestJsLoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const crypto_1 = __importDefault(require("crypto"));
let NestJsLoggerService = class NestJsLoggerService {
    constructor(logger) {
        this.logger = logger;
        this._trackId = '';
    }
    get trackId() {
        if (!this._trackId) {
            this._trackId = this.createTrackId();
        }
        return this._trackId;
    }
    set trackId(value) {
        this._trackId = value;
    }
    formatContent(message, context) {
        if (typeof message === 'string' && typeof context !== 'string') {
            return { message: message, context: context };
        }
        if (typeof message !== 'string' && !context && (message === null || message === void 0 ? void 0 : message.message)) {
            return { message: message.message, context: message };
        }
        return { message: context, context: message };
    }
    getErrorStack(message, context) {
        if (message instanceof Error) {
            return message.stack;
        }
        if (context instanceof Error) {
            return context.stack;
        }
        return null;
    }
    error(message, context) {
        const stack = this.getErrorStack(message, context);
        this.logger.error(Object.assign(Object.assign({}, this.formatContent(message, context)), { stack }));
    }
    log(message, context) {
        this.logger.info(this.formatContent(message, context));
    }
    warn(message, context) {
        this.logger.warn(this.formatContent(message, context));
    }
    debug(message, context) {
        this.logger.debug(this.formatContent(message, context));
    }
    createTrackId() {
        const currentDate = new Date().valueOf().toString();
        const random = Math.random().toString();
        return crypto_1.default
            .createHash('sha1')
            .update(currentDate + random)
            .digest('hex');
    }
};
NestJsLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [winston_1.Logger])
], NestJsLoggerService);
exports.NestJsLoggerService = NestJsLoggerService;
//# sourceMappingURL=nest-js-logger.service.js.map