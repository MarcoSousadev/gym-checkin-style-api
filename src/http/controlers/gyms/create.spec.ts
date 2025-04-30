import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'
import { it } from 'node:test'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym(e2e)',  () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  it('shouldbe able to create a gym', async () =>{
   
  const { token } = await createAndAuthenticateUser(app)

  const response = await request(app.server).post('/gyms').set('Authorization', `Bearer${token}`).send({
    title: 'javascript gym',
    description: 'some description',
    phone: '31 99999999',
    latitude: -19.9774826
          ,
     longitude: -44.0247775,
  })

  expect(response.statusCode).toEqual(201)
  
  }
)
}
)