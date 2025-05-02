import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect  } from 'vitest'
import { it } from 'node:test'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
import { date } from 'zod'

describe('Validate check-in(e2e)',  () => {

  beforeAll(async ()=> {
    await app.ready()
  })

  afterAll(async ()=> {
    await app.close()
  })

  it('shouldbe able to validate a check-in', async () =>{
   
  const { token } = await createAndAuthenticateUser(app, true)

  const user = await prisma.user.findFirstOrThrow()

  const gym = await prisma.gym.create({
    data: {
      title: 'javascript gym',
      latitude: -19.9774826,
      longitude: -44.0247775,
    }
  })

  let checkIn = await prisma.checkIn.create({
    data: {
      gym_id: gym.id,
      user_id: user.id
    }
  })

  const response = await request(app.server).post(`/check-ins/${checkIn.id}`).set('Authorization', `Bearer${token}`).send()

  expect(response.statusCode).toEqual(204)  

  checkIn = await  prisma.checkIn.findUniqueOrThrow({
    where: {
      id:checkIn.id
    }
  })

  expect(checkIn.validated_at).toEqual(expect.any(date))
  }
)
}
)