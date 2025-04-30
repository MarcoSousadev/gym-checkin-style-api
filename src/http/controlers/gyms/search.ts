import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-hyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })


  const { q, page } = searchQuerySchema.parse(request.query)

  
    const searchGymUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymUseCase.execute({
      query: q, 
      page
    })
  

  return reply.status(200).send({
    gyms
  })
}
