import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby( request: FastifyRequest, reply: FastifyReply ){

            
    const nearbyQuerySchema = z.object({

        userLatitude: z.number().refine((value)=>{
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine((value)=>{
            return Math.abs(value) <= 180
        }),
    })

    const { userLatitude, userLongitude } = nearbyQuerySchema.parse(request.query)
    
    const fetchGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } =await fetchGymsUseCase.execute({ userLatitude, userLongitude })

    return reply.status(200).send({gyms,})
}