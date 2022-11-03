import { AppDataSource } from "../../data-source"
import { Internet_plan } from "../../entities/internet_plan.entity"
import { AppError } from "../../errors/appError"



export const listPlansByIdService = async (id:any)=>{

    const internet_planRepository = AppDataSource.getRepository(Internet_plan)

    const plansById = await internet_planRepository.findBy({
        id: id
    })

    if(!plansById){
        throw new AppError("Usuário não encontrado")
    }

    

}