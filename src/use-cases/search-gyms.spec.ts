import { expect, describe, it, beforeEach } from "vitest"
import { SearchGymsUseCase } from "./search-gyms"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"



let gymsRepository: InMemoryGymsRepository

let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })


    it('should be able to search for gyms', async () => {

        await gymsRepository.create({
            title: 'JavaScript gym',
            description: null,
            phone: null,
            latitude: -3.8004146,
            longitude: -38.564398
           
        })

        await gymsRepository.create({
            title: 'TypeScript gym',
            description: null,
            phone: null,
            latitude: -3.8004146,
            longitude: -38.564398
        })
 
        const { gyms } = await sut.execute({
          query: 'JavaScript',
          page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining( {title: 'JavaScript gym'}),
         ])
    })

    it('should be able to fetch paginated gyms search', async () => {
    
        for(let i = 1; i <= 22; i++){
            await gymsRepository.create({
                title: `JavaScript gyms ${i} `,
                description: null,
                phone: null,
                latitude: -3.8004146,
                longitude: -38.564398
            })
        }
    
            const { gyms } = await sut.execute({
                query: 'JavaScript',
                page: 2
            })
    
            expect(gyms).toHaveLength(2)
            expect(gyms).toEqual([
                expect.objectContaining( {title: `JavaScript gyms 21 `}),
                expect.objectContaining( {title: `JavaScript gyms 22 `})
             ])
    })
})
