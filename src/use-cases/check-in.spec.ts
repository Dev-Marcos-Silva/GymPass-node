import { expect, describe, it, beforeEach, afterEach, vi} from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"


let userRepository: InMemoryCheckInRepository

let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        userRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(userRepository)

        vi.useFakeTimers()
    })
    
    afterEach(() =>{
        vi.useRealTimers()
    })

    it('should be able to created check in', async () => {

        
        const { checkIn } = await sut.execute({
           gymId: 'gym_id-01',
           userId: 'user_id-01'

        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0 ))

        await sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01'
 
        })

        await expect(() => sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01'
 
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0 ))

        await sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01'
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0 ))

        const { checkIn } = await sut.execute({
            gymId: 'gym_id-01',
            userId: 'user_id-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

})
