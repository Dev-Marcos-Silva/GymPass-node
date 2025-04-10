import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"


let gymsRepository: InMemoryGymsRepository

let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })


    it('should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near gym',
            description: null,
            phone: null,
            latitude: -3.8004146,
            longitude: -38.564398  
        })

        await gymsRepository.create({
            title: 'Far gym',
            description: null,
            phone: null,
            latitude: -3.7301398,
            longitude: -38.5697973
        })
 
        const { gyms } = await sut.execute({
            userLatitude: -3.8004146,
            userLongitude: -38.564398
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining( {title: 'Near gym'}),
         ])
    })
})
