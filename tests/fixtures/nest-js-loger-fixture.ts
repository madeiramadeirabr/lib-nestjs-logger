
type LoggerMethods = {
    error: Function,
    log: Function,
    warn: Function,
    debug: Function
}

export const makeLoggerFixture = (props?: LoggerMethods): any => {
    const hasProps = !!props

    if(hasProps) {
        return props
    }
    
    const defaultLoggerMethods = {
        error: jest.fn(),
        log: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    }

    return defaultLoggerMethods
  };
  