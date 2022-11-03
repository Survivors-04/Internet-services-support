import { Request, Response } from "express"
import { AppError } from "../../errors/appError"
import { createInternet_PlanService } from "../../services/internet_plan/create.internet_plan.services"


export const createInternet_PlanController = async (req: Request, res: Response)=>{


    try {
        const {name, description, price} = req.body
    
        const newPlan = await createInternet_PlanService({name, description, price})
    
    
        return res.status(200).json(newPlan)
        
    } catch (error) {
        if(error instanceof AppError){

        }
    }
}