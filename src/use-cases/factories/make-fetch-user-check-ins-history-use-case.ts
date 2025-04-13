import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryUserCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase(){

    const checkInRespository = new PrismaCheckInsRespository()

    const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUserCase(checkInRespository)
    
    return fetchUserCheckInsHistoryUseCase
}