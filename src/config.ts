export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const PORT = Number(process.env.PORT) || 3000

export const CORS_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
] as const
