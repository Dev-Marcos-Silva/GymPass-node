import { authenticate } from "../controllers/authenticate";
import { registers } from "../controllers/register";
import { FastifyInstance } from "fastify";

export async function appRoutes( app: FastifyInstance ){

    app.post('/users', registers)

    app.post('/sessions', authenticate)

}