import { FastifyInstance } from "fastify";
import { registers } from "../controllers/register";

export async function appRoutes( app: FastifyInstance ){

    app.post('/users', registers)

}