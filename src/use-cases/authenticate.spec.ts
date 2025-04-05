import { expect, describe, it, beforeEach} from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-repository"
import { AuthenticateUseCase } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./err/invalid-credentials-err"


let userRepository: InMemoryUserRepository

let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(userRepository)
    })

    it('should be able to authenticate', async () => {

        await userRepository.create({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        expect(() =>
            sut.execute({
                email: 'johndoe@gmail.com',
                password: '123456'
            }) 
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {

        await userRepository.create({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        })

        expect(() =>
            sut.execute({
                email: 'johndoe@gmail.com',
                password: '123134'
            }) 
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
