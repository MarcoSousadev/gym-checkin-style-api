import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'

describe('Register(e2e)', async () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  const response = await request(app.server)
  .post('/users')
  .send({
    name: 'Jhon Doe',
    email: 'jhondoe@example.com',
    password: '123456'
  })

  expect(response.statusCode).toEqual(201)
})