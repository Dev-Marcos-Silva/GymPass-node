import { CheckIn } from "@prisma/client";
import { CheckInRepository} from "@/repositories/check-ins-repositories";
import { GymsRepository } from "@/repositories/gyms-respositories";
import { ResourceNotFoundError } from "./err/resource-not-found-err";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./err/max-distance-err";
import { MaxNumberOfCheckInsError } from "./err/max-number-of-check-ins-err";

interface CheckInUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse{
    checkIn: CheckIn
}

export class CheckInUseCase {

    constructor( 
        private checkInRepository: CheckInRepository,
        private gymsRespository: GymsRepository
    ){}

    async execute({userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest ): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRespository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {   
                latitude: userLatitude,
                longitude: userLongitude            
            },
            {   
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId, 
            new Date()
        )

        if(checkInOnSameDay){
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn,
        }

    }

}