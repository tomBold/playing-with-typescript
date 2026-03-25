import { createApp } from './app'
import { NODE_ENV, PORT } from './config'
import { logger } from './logger'

const app = createApp()

app.listen(PORT, () => {
  logger.info({ port: PORT, env: NODE_ENV }, 'API listening')
})
