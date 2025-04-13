import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase(){

    const checkInRespository = new PrismaCheckInsRespository()

    const gymsRespository = new PrismaGymsRepository()

    const checkInUseCase = new CheckInUseCase(checkInRespository, gymsRespository)

    return checkInUseCase
}