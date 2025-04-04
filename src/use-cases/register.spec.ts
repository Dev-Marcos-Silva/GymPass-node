import { test, expect, describe, it} from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-repository"
import { UserAlreadyExistsError } from "./err/user-already-exists-err"

describe('Register Use Case', () => {

    it('should be able to register', async () => {

        const UserRepository = new InMemoryUserRepository()

        const registerUseCase = new RegisterUseCase(UserRepository)

        const { user } = await registerUseCase.execute({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {

        const UserRepository = new InMemoryUserRepository()

        const registerUseCase = new RegisterUseCase(UserRepository)

        const { user } = await registerUseCase.execute({
            name: 'john doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)


        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {

        const UserRepository = new InMemoryUserRepository()
        
        const registerUseCase = new RegisterUseCase(UserRepository)

        const email = 'johndoe@example.com'

        await registerUseCase.execute({
            name: 'john doe',
            email,
            password: '123456'
        })

        expect( () => 
            registerUseCase.execute({
                name: 'john doe',
                email,
                password: '123456'
            })

        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
       
    })
})

