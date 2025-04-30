import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {

  const createCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid()
  })


  const {  checkInId } = createCheckInsParamsSchema.parse(request.params)
  
    const validadeteCheckInUseCase = makeValidateCheckInUseCase()

    await validadeteCheckInUseCase.execute({
      checkInId
    })
  

  return reply.status(204).send()
}
