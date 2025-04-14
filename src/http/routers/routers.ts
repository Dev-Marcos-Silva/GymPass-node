import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/authenticate";
import { profile } from "../controllers/profile";
import { registers } from "../controllers/register";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function appRoutes( app: FastifyInstance ){

    app.post('/users', registers)
    app.post('/sessions', authenticate)

    /**Authentication**/

    app.get('/me', { onRequest: [ verifyJWT ] }, profile)

}