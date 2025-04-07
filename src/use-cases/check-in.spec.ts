import { expect, describe, it, beforeEach, afterEach, vi} from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CheckInUseCase } from "./check-in"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxNumberOfCheckInsError } from "./err/max-number-of-check-ins-err"
import { MaxDistanceError } from "./err/max-distance-err"


let userRepository: InMemoryCheckInRepository

let gymsRespository: InMemoryGymsRepository

let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach( async () => {
        userRepository = new InMemoryCheckInRepository()
        gymsRespository = new InMemoryGymsRepository()

        sut = new CheckInUseCase(userRepository, gymsRespository)

        await gymsRespository.create({
            id: 'gym_id-01',
            title: 'javaScript',
            description: null,
            phone: null,
            latitude: -3.8004146,
            longitude: -38.564398
        })

        vi.useFakeTimers()
    })
    
    afterEach(() =>{
        vi.useRealTimers()
    })

    it('should be able to created check in', async () => {

        
        const { checkIn } = await sut.execute({
           gymId: 'gym_id-01',
           userId: 'user_id-01',
           userLatitude:-3.8004146,
           userLongitude: -38.564398
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0 ))

        await sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01',
            userLatitude:-3.8004146,
            userLongitude: -38.564398
 
        })

        await expect(() => sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01',
            userLatitude:-3.8004146,
            userLongitude: -38.564398
 
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in twice but in different day', async () => {

        //-3.8004146,-38.564398,19.75

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0 ))

        await sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01',
            userLatitude:-3.8004146,
            userLongitude: -38.564398
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0 ))

        const { checkIn } = await sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01',
            userLatitude:-3.8004146,
            userLongitude: -38.564398
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in on distant gym', async () => {

        gymsRespository.items.push({
            id: 'gym_id-02',
            title: 'javaScript',
            description: ' ',
            phone: ' ',
            latitude: new Decimal(-3.7878262),
            longitude: new Decimal(-38.5651488)
        })

        //-3.7878262,-38.5651488

        await expect(() => 
            sut.execute({
            gymId: 'gym_id-02',
            userId: 'user_id-01',
            userLatitude: -3.8004146,
            userLongitude: -38.564398
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })

})
