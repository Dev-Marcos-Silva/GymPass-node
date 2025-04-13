import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInsUseCase(){

    const checkInRespository = new PrismaCheckInsRespository()

    const validateCheckInsUseCase = new ValidateCheckInUseCase(checkInRespository)

    return validateCheckInsUseCase
}