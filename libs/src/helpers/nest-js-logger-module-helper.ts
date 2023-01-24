import { Format } from 'logform';

import * as winston from 'winston'
import { WinstonModuleOptions } from 'nest-winston'


const getWinstonFormattersByEnvHelper = (): Format[] => {
  const formatters: Format[] = [winston.format.timestamp(), winston.format.json()];

  if (process.env.APPLICATION_ENV === 'production' || process.env.APPLICATION_ENV === 'staging') {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    const newrelicFormatter = require('@newrelic/winston-enricher');
    return [...formatters, newrelicFormatter(winston)];
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
      service_name: process.env.NEW_RELIC_APP_NAME,
    },
    transports: [new winston.transports.Console()],
  }
}

export const getWinstonSettingsForRoot = (winstonModuleOptions?: WinstonModuleOptions,) => {
  if (winstonModuleOptions) {
    return mergeWinstonSettingsParams(winstonModuleOptions)
  }



  const defaultWinstonConfiguration = getDefaultWinstonConfiguration()

  return defaultWinstonConfiguration
}

export const mergeWinstonSettingsParams = (winstonModuleOptions?: WinstonModuleOptions) => {
  const defaultConfiguration = getDefaultWinstonConfiguration()




  const mergeWinston: WinstonModuleOptions = Object.assign({}, defaultConfiguration, winstonModuleOptions)

  return mergeWinston
}