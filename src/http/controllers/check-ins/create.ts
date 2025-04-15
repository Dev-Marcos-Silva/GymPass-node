import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create( request: FastifyRequest, reply: FastifyReply ){
    

    const createCheckInsParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInsBodySchema = z.object({
       
        userLatitude: z.number().refine((value)=>{
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine((value)=>{
            return Math.abs(value) <= 180
        }),
    })

    const { gymId } = createCheckInsParamsSchema.parse(request.params)

    const { userLatitude, userLongitude} = createCheckInsBodySchema.parse(request.body)
    
    const createCheckInsUseCase = makeCheckInUseCase() 

    const checkIn = await createCheckInsUseCase.execute({
        userId: request.user.sub,
        gymId, 
        userLatitude, 
        userLongitude 
    })

    return reply.status(200).send({ checkIn, })
}