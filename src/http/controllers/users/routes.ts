import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { registers } from "./register";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function usersRoutes( app: FastifyInstance ){

    app.post('/users', registers)
    app.post('/sessions', authenticate)

    /**Authentication**/

    app.get('/me', { onRequest: [ verifyJWT ] }, profile)

}