import { ZodError } from "zod";
import { appRoutes } from "./http/routers/routers";
import fastify from "fastify";
import { env } from "./env";

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {

    if(error instanceof ZodError){
        return reply.status(400).send({
            message: 'Validation error.', issues: error.format()
        })
    }
    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }else{

    }

    return reply.status(500).send({ message: 'Internal server error.' })

})