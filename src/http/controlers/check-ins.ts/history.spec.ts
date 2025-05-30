import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'
import { it } from 'node:test'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('History of check-ins(e2e)',  () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () =>{
   
  const { token } = await createAndAuthenticateUser(app)

  const user = await prisma.user.findFirstOrThrow()

  const gym = await prisma.gym.create({
    data: {
      title: 'javascript gym',
      latitude: -19.9774826,
      longitude: -44.0247775,
    }
  })

    await prisma.checkIn.createMany({
    data: [
      {
      gym_id: gym.id,
      user_id: user.id

    }
    ,
    {
      gym_id: gym.id,
      user_id: user.id

    }
  ]
  })

  const response = await request(app.server).get('/check-ins/history').set('Authorization', `Bearer${token}`).send()

  expect(response.statusCode).toEqual(200)
  expect(response.body.checkIns).toEqual([
    expect.objectContaining({
      gym_id: gym.id,
      user_id: gym.id
    }),
    expect.objectContaining({
      gym_id: gym.id,
      user_id: gym.id
    })
  ])
  }
)
}
)