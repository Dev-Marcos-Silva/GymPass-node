import { CheckIn } from "@prisma/client";
import { CheckInRepository} from "@/repositories/check-ins-repositories";
import { ResourceNotFoundError } from "./err/resource-not-found-err";
import { LateCheckInValidationError } from "./err/late-check-in-validation-err";
import dayjs from "dayjs";


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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn,
        }

    }

}