import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUserCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase(){

    const checkInRespository = new PrismaCheckInsRespository()

    const getUserMetricsUseCase = new GetUserMetricsUserCase(checkInRespository)

    return getUserMetricsUseCase
}