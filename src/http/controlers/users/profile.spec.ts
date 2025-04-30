import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'
import { it } from 'node:test'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Authenticate(e2e)',  () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  it('shouldbe able to get user profile', async () =>{
   
  const { token } = await createAndAuthenticateUser(app)

  const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer${token}`).send()

  expect(profileResponse.statusCode).toEqual(200)
  expect(profileResponse.body.user).toEqual(expect.objectContaining({
    email: 'jhondoe@example.com',
  }))

  } )

  
})