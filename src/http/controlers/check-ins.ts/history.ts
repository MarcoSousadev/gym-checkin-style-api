import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserCheckInHistoryQuerySchema = z.object({
  
    page: z.coerce.number().min(1).default(1)
  })


  const { page } = fetchUserCheckInHistoryQuerySchema.parse(request.query)

  
    const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase()

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: request.user.sub,
     
      page
    })
  

  return reply.status(200).send({
    checkIns
  })
}
