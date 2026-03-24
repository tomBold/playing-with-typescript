import express from 'express'
import { applyBaseMiddleware } from './middleware/setup'
import { apiRouter } from './routes/api/index'
import { registerClientStaticAndSpa } from './static/serveClient'

export function createApp() {
  const app = express()

  applyBaseMiddleware(app)
  app.use('/api', apiRouter)
  registerClientStaticAndSpa(app, __dirname)

  return app
}
