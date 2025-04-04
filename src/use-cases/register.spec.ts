import { expect, describe, it, beforeEach} from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-repository"
import { UserAlreadyExistsError } from "./err/user-already-exists-err"

let userRepository: InMemoryUserRepository

let sut: RegisterUseCase

describe('Register Use Case', () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('should be able to register', async () => {

        const { user } = await sut.execute({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {

        const { user } = await sut.execute({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)


        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {

        const email = 'johndoe@example.com'

        await sut.execute({
            name: 'john doe',
            email,
            password: '123456'
        })

        await expect( () => 
            sut.execute({
                name: 'john doe',
                email,
                password: '123456'
            })

        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
       
    })
})

