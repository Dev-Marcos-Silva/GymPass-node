import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

prisma.user.create({
    data:{
        name: "marcos",
        email: "marcos@gmail.com"
    }
})

export const app = fastify()