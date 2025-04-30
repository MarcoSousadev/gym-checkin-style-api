import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'
import { it } from 'node:test'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create check-in(e2e)',  () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  it('shouldbe able to create a check-in', async () =>{
   
  const { token } = await createAndAuthenticateUser(app)

  const gym = await prisma.gym.create({
    data: {
      title: 'javascript gym',
      latitude: -19.9774826,
      longitude: -44.0247775,
    }
  })

  const response = await request(app.server).post(`/gyms/${gym.id}`).set('Authorization', `Bearer${token}`).send({

    latitude: -19.9774826 ,
    longitude: -44.0247775,
  })

  expect(response.statusCode).toEqual(201)
  
  }
)
}
)