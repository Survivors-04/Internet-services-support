import { AppDataSource } from "../../data-source"
import { Internet_plan } from "../../entities/internet_plan.entity"
import { AppError } from "../../errors/appError"

interface ICreatePlanRequest{
    name: string,
    description: string,
    price: number
}

export const createInternet_PlanService = async ({name, description, price}: ICreatePlanRequest)=>{

    const createInternet_PlanRepository = AppDataSource.getRepository(Internet_plan)

    const plans = await createInternet_PlanRepository.find() 

    const verifyIfAlreadyExists = plans.find(plan=> plan.name === name)

    if(verifyIfAlreadyExists){
        throw new AppError("O plano já existe")
    }

    const newPlan = new Internet_plan()

    newPlan.name = name
    newPlan.description = description
    newPlan.price = price

    createInternet_PlanRepository.create(newPlan)
    await createInternet_PlanRepository.save(newPlan)

    return newPlan

}




