import { CheckIn} from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";


interface FetchUserCheckInHistoryRequest {
  userId: string
  page: number
  
}

interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(
    private CheckInsRepository: CheckInsRepository,
  ){}

    
   
  async execute({ userId, page }:FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse>{

    const checkIns = await this.CheckInsRepository.findManyByUserId(userId, page)
    

      return {
        checkIns,
      }
  }
}