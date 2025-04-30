import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInsUseCase } from "../validade-check-in"

export function makeValidateCheckInUseCase () {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckInsUseCase(checkInsRepository)

    return useCase
}