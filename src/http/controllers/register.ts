import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { z } from "zod";

export async function registers( request: FastifyRequest, reply: FastifyReply ){

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try{ 
        const userRepository = new PrismaUserRepository()

        const registerUseCase = new RegisterUseCase(userRepository)

        await registerUseCase.execute({name, email, password})

    }catch (err){

        return reply.status(409).send()
    }
 
    return reply.status(201).send()
}