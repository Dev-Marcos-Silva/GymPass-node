import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { GetUserMetricsUserCase } from "./get-user-metrics"


let checkInsRepository: InMemoryCheckInRepository

let sut: GetUserMetricsUserCase

describe('Get User Metrics Use Case', () => {

    beforeEach( async () => {
        checkInsRepository = new InMemoryCheckInRepository()

        sut = new GetUserMetricsUserCase(checkInsRepository)

    })

    it('should be able to get check-ins count from metrics', async () => {

        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user_id-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user_id-01'
        })
 
        const { checkInsCount } = await sut.execute({
           userId: 'user_id-01',
        })

        expect(checkInsCount).toEqual(2)
       
    })

})
