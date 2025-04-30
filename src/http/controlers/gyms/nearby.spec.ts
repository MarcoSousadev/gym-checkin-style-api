import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'
import { it } from 'node:test'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym(e2e)',  () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  it('shouldbe able to search gyms by title', async () =>{
   
  const { token } = await createAndAuthenticateUser(app)

 

   await request(app.server).get('/gyms').set('Authorization', `Bearer${token}`).send({
    title: 'javascript gym',
    description: 'some description',
    phone: '31 99999999',
    latitude: -19.98512,
    longitude: -44.0376368,
  })

 await request(app.server).get('/gyms').set('Authorization', `Bearer${token}`).send({
    title: 'typecript gym',
    description: 'some description',
    phone: '31 99999999',
    latitude: -19.8545956,
    longitude: -43.9582337,
  })


  const response = await request(app.server)
  .get('/gyms/nearby')
  .query({
    latitude: -19.98512,
    longitude: -44.0376368,
  })
  .set('Authorization', `Bearer${token}`)
  .send()

  expect(response.statusCode).toEqual(200)
  expect(response.body.gyms).toHaveLength(1)
  expect(response.body.gyms).toEqual([
    expect.objectContaining({
      title:'javascript gym'
    })
  ])
  
  }
)
}
)