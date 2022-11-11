import { Inject, Injectable, LoggerService } from '@nestjs/common';

import { Logger } from 'winston';
import crypto from 'crypto'

import { FormatedContentType } from './types';

@Injectable()
export class NestJsLoggerService implements LoggerService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) { }
  protected context?: string;
  private _trackId = '';

  public get trackId() {
    if (!this._trackId) {
      this._trackId = this.createTrackId();
      console.log("test")
    }
    return this._trackId;
  }

  public set trackId(value) {
    this._trackId = value;
  }

  private formatContent(message: any, context?: string): FormatedContentType {
    if (typeof message === 'string' && typeof context !== 'string') {
      return { message: message, context: context };
    }

    if (typeof message !== 'string' && !context && message?.message) {
      return { message: message.message, context: message };
    }

    return { message: context, context: message };
  }

  private getErrorStack(message: any, context: any): string {
    if (message instanceof Error) {
      return message.stack;
    }
    if (context instanceof Error) {
      return context.stack;
    }
    return null;
  }

  error(message: any, context?: string): void {
    const stack = this.getErrorStack(message, context);
    this.logger.error({ ...this.formatContent(message, context), stack });
  }
  log(message: any, context?: string): void {
    this.logger.info(this.formatContent(message, context));
  }
  warn(message: any, context?: string): void {
    this.logger.warn(this.formatContent(message, context));
  }
  debug(message: any, context?: string): void {
    this.logger.debug(this.formatContent(message, context));
  }

  private createTrackId() {
    const currentDate = new Date().valueOf().toString();
    const random = Math.random().toString();

    return crypto
      .createHash('sha1')
      .update(currentDate + random)
      .digest('hex');
  }
}
