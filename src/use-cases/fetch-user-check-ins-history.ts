import { CheckIn } from "@prisma/client";
import { CheckInRepository} from "@/repositories/check-ins-repositories";

interface FetchUserCheckInsHistoryUserCaseRequest{
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUserCaseResponse{
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUserCase {

    constructor( 
        private checkInRepository: CheckInRepository,
    ){}
 
    async execute({ userId, page }: FetchUserCheckInsHistoryUserCaseRequest ): Promise<FetchUserCheckInsHistoryUserCaseResponse> {

        const checkIns = await this.checkInRepository.findManyByUserId(userId, page )

        return {

            checkIns
            
        }

    }

}