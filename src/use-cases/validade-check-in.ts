import { CheckIn} from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInsUseCase {
  constructor(
    private CheckInsRepository: CheckInsRepository,
  ){}

    
   
  async execute({ checkInId }:ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{

    const checkIn = await this.CheckInsRepository.findById(checkInId)

    if(!checkIn){
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if(distanceInMinutesFromCheckInCreation > 20 ) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.CheckInsRepository.save(checkIn)
    
    return {
      checkIn
    }
    
  }
}