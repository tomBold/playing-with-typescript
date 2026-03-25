import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../../src/app'

const app = createApp()

describe('GET /api/health', () => {
  it('returns 200 with ok: true', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })

  it('includes service name and ISO timestamp', async () => {
    const res = await request(app).get('/api/health')
    expect(res.body.service).toBe('api')
    expect(typeof res.body.time).toBe('string')
    expect(() => new Date(res.body.time)).not.toThrow()
  })
})
