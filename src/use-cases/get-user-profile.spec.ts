import { expect, describe, it, beforeEach} from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-repository"
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotFoundError } from "./err/resource-not-found-err"
import { hash } from "bcryptjs"

let userRepository: InMemoryUserRepository

let sut: GetUserProfileUseCase

describe('Get user profile Use Case', () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it('should be able to get user profile', async () => {

       const createdUser = await userRepository.create({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('John doe')
    })

    it('should not be able to get user profile with wrong id', async () => {

        expect(() =>
            sut.execute({
                userId: 'non-existing-id'
            }) 
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})
