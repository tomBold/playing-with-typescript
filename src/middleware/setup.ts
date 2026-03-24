import cors from 'cors'
import express, { type Express } from 'express'
import { CORS_ORIGINS } from '../config'

export function applyBaseMiddleware(app: Express) {
  app.use(cors({ origin: [...CORS_ORIGINS] }))
  app.use(express.json())
}
