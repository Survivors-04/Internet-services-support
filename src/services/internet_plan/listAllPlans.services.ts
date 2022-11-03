import { AppDataSource } from "../../data-source"
import { Internet_plan } from "../../entities/internet_plan.entity"



export const listAllPlansService = ()=>{

    const internet_planRepository = AppDataSource.getRepository(Internet_plan)
    
    const allPlans = internet_planRepository.find()

    return allPlans

}