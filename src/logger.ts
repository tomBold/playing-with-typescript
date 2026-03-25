import pino from 'pino'

const env = process.env.NODE_ENV ?? 'development'

const level = process.env.LOG_LEVEL ?? (
  env === 'test'       ? 'silent' :
  env === 'production' ? 'info'   :
                         'debug'
)

const transport = env === 'development'
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss',
        ignore: 'pid,hostname',
      },
    }
  : undefined

export const logger = pino({ level, transport })
