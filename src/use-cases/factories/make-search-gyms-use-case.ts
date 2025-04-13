import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase(){

    const gymsRespository = new PrismaGymsRepository()

    const searchGymsUseCase = new SearchGymsUseCase(gymsRespository)

    return searchGymsUseCase
}