import cors from 'cors'
import express, { type Express } from 'express'
import pinoHttp from 'pino-http'
import { CORS_ORIGINS } from '../config'
import { logger } from '../logger'

export function applyBaseMiddleware(app: Express) {
  app.use(pinoHttp({ logger }))
  app.use(cors({ origin: [...CORS_ORIGINS] }))
  app.use(express.json())
}
