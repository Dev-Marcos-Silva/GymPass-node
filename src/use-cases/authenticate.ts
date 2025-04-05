import { UserRepository } from "@/repositories/users-repositories";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./err/invalid-credentials-err";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateUseCaseResponse{
    user: User
}

export class AuthenticateUseCase {

    constructor( private userRepository: UserRepository ){
    }

    async execute({email, password }: AuthenticateUseCaseRequest ): Promise<AuthenticateUseCaseResponse> {

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPassworsMatches = await compare(password, user.password_hash)

        if(!doesPassworsMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }

    }

}