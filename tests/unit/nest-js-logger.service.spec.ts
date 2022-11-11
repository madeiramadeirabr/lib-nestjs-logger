import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { NestJsLoggerService } from '../../libs/src/nest-js-logger.service';
import { makeLoggerParamsFixture } from '../fixtures';

const winstonLoggerFixture = ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
})

describe('NestJsLoggerService', () => {
  let service: NestJsLoggerService;
  let logger: Logger

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NestJsLoggerService,
        {
          provide: 'Logger',
          useClass: jest.fn(),
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: winstonLoggerFixture,
        },
      ],
    }).compile();

    service = await module.resolve<NestJsLoggerService>(NestJsLoggerService);
    logger = await module.resolve<Logger>('winston')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('error', () => {
    it("should be defined", () => {
      expect(service.error).toBeDefined();
    })

    it("should call the logger.error", () => {
      const loggerErrorSpy = jest.spyOn(logger, 'error')
      const { message, context } = makeLoggerParamsFixture()

      service.error(message, context)

      expect(loggerErrorSpy).toBeCalledWith({
        context: message,
        message: context,
        stack: null
      })
    })
    it("should call the formatContent", () => {
      const formatContentSpy = jest.spyOn(service as any, 'formatContent')
      const { message, context } = makeLoggerParamsFixture()

      service.error(message, context)

      expect(formatContentSpy).toBeCalled()
    })
    it("should call the getErrorStack", () => {
      const getErrorStackSpy = jest.spyOn(service as any, 'getErrorStack')
      const { message, context } = makeLoggerParamsFixture()

      service.error(message, context)

      expect(getErrorStackSpy).toBeCalledWith(message, context)
    })
  });

  describe('log', () => {
    it("should be defined", () => {
      expect(service.log).toBeDefined();
    })
    it("should call the logger.log", () => {
      const loggerLogSpy = jest.spyOn(logger, 'info')
      const { message, context } = makeLoggerParamsFixture()

      service.log(message, context)

      expect(loggerLogSpy).toBeCalledWith({
        context: message,
        message: context,
      })
    })

    it("should call the formatContent", () => {
      const formatContentSpy = jest.spyOn(service as any, 'formatContent')
      const { message, context } = makeLoggerParamsFixture()

      service.log(message, context)

      expect(formatContentSpy).toBeCalled()
    })

  });

  describe('warn', () => {
    it("should be defined", () => {
      expect(service.warn).toBeDefined();
    })
    it("should call the logger.warn", () => {
      const loggerWarnSpy = jest.spyOn(logger, 'warn')
      const { message, context } = makeLoggerParamsFixture()

      service.warn(message, context)

      expect(loggerWarnSpy).toBeCalledWith({
        context: message,
        message: context,
      })
    })
    it("should call the formatContent", () => {
      const formatContentSpy = jest.spyOn(service as any, 'formatContent')
      const { message, context } = makeLoggerParamsFixture()

      service.warn(message, context)

      expect(formatContentSpy).toBeCalled()
    })
  });

  describe('debug', () => {
    it("should be defined", () => {
      expect(service.debug).toBeDefined();
    })

    it("should call the logger.debug", () => {
      const loggerDebugSpy = jest.spyOn(logger, 'debug')
      const { message, context } = makeLoggerParamsFixture()

      service.debug(message, context)

      expect(loggerDebugSpy).toBeCalledWith({
        context: message,
        message: context,
      })
    })

    it("should call the formatContent", () => {
      const formatContentSpy = jest.spyOn(service as any, 'formatContent')
      const { message, context } = makeLoggerParamsFixture()

      service.debug(message, context)

      expect(formatContentSpy).toBeCalled()
    })
  });

  describe('formatContent', () => {
    it('should return the correct payload when the message is a string', () => {
      const { message, context } = makeLoggerParamsFixture()


      const formatContentSpy = jest.spyOn(service as any, 'formatContent')

      service.debug(message, context)

      expect(formatContentSpy).toReturnWith({
        message: context,
        context: message
      })
    })
    it('should return the correct payload when the message is a object', () => {

      const { context } = makeLoggerParamsFixture()

      const message = { message: 'message' }
      const formatContentSpy = jest.spyOn(service as any, 'formatContent')

      service.debug(message)

      expect(formatContentSpy).toReturnWith({
        message: message.message,
        context: message
      })
    })
    it('should return the correct payload when the flow no is suitable another cases', () => {
      const { context } = makeLoggerParamsFixture()

      const message = { message: 'message' }
      const formatContentSpy = jest.spyOn(service as any, 'formatContent')

      service.debug(message, context)

      expect(formatContentSpy).toReturnWith({
        message: context,
        context: message
      })
    })
  })

  describe('getErrorStack', () => {
    it("should return null when the params not is a Error Class", () => {
      const getErrorStackSpy = jest.spyOn(service as any, 'getErrorStack')
      const { message, context } = makeLoggerParamsFixture()

      service.error(message, context)

      expect(getErrorStackSpy).toReturnWith(null)
    })
    it("should return stack error when the message is a Error Class", () => {
      const getErrorStackSpy = jest.spyOn(service as any, 'getErrorStack')
      const { context } = makeLoggerParamsFixture()
      const message = new Error()
      service.error(message, context)

      expect(getErrorStackSpy).toReturnWith(message.stack)
    })
    it("should return stack error when the context is a Error Class", () => {
      const getErrorStackSpy = jest.spyOn(service as any, 'getErrorStack')
      const { message } = makeLoggerParamsFixture()
      const context = new Error() as unknown as any
      service.error(message, context)

      expect(getErrorStackSpy).toReturnWith(context.stack)
    })
  })

  describe('trackId', () => {
    it('should create a new trackId when not exists', () => {

      const createTrackIdSpy = jest.spyOn(service as any, 'createTrackId')

      const trackId = service.trackId


      expect(createTrackIdSpy).toBeCalled()
      expect(trackId).toBeDefined()
    })

    it('should use the current trackId when exists', () => {
      jest.clearAllMocks()

      const trackId = service.trackId

      const createTrackIdSpy = jest.spyOn(service as any, 'createTrackId')

      const sameTrackId = service.trackId
      expect(trackId).toStrictEqual(sameTrackId)
      expect(createTrackIdSpy).not.toBeCalled()
    })
  })


});
