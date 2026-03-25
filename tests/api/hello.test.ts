import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../../src/app'

const app = createApp()

describe('GET /api/hello', () => {
  it('returns 200 with a plain-text response', async () => {
    const res = await request(app).get('/api/hello')
    expect(res.status).toBe(200)
    expect(res.type).toMatch(/text/)
  })

  it('contains a greeting string', async () => {
    const res = await request(app).get('/api/hello')
    expect(res.text.length).toBeGreaterThan(0)
  })
})
