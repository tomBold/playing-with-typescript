import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../../src/app'

const app = createApp()

describe('POST /api/echo', () => {
  it('echoes the request body back', async () => {
    const body = { message: 'hello', num: 42 }
    const res = await request(app)
      .post('/api/echo')
      .send(body)
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body.echoed).toEqual(body)
  })

  it('includes a receivedAt ISO timestamp', async () => {
    const res = await request(app)
      .post('/api/echo')
      .send({ x: 1 })
      .set('Content-Type', 'application/json')
    expect(typeof res.body.receivedAt).toBe('string')
    expect(() => new Date(res.body.receivedAt)).not.toThrow()
  })

  it('returns 400 when body is empty', async () => {
    const res = await request(app)
      .post('/api/echo')
      .send({})
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })
})
