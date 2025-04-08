import { CheckIn } from "@prisma/client";
import { CheckInRepository} from "@/repositories/check-ins-repositories";

interface GetUserMetricsUserCaseRequest{
    userId: string
}

interface GetUserMetricsUserCaseResponse{
    checkInsCount: number
}

export class GetUserMetricsUserCase {

    constructor( 
        private checkInRepository: CheckInRepository,
    ){}
 
    async execute({ userId }: GetUserMetricsUserCaseRequest ): Promise<GetUserMetricsUserCaseResponse> {

        const checkInsCount = await this.checkInRepository.CountByUserId(userId)

        return {
            checkInsCount
        }  
        
    }

}