import { CheckIn } from "@prisma/client";
import { CheckInRepository} from "@/repositories/check-ins-repositories";
import { ResourceNotFoundError } from "./err/resource-not-found-err";


interface ValidateCheckInUseCaseRequest{
    checkInId: string
}

interface ValidateCheckInUseCaseResponse{
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {

    constructor( private checkInRepository: CheckInRepository ){}

    async execute({ checkInId }: ValidateCheckInUseCaseRequest ): Promise<ValidateCheckInUseCaseResponse> {

        const checkIn = await this.checkInRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn,
        }

    }

}