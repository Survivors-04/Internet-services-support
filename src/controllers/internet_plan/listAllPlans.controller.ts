import { Request, Response } from "express"
import { AppError } from "../../errors/appError"
import { listAllPlansService } from "../../services/internet_plan/listAllPlans.services"


export const listAllPlansController = (req: Request, res: Response)=>{

    try {
        const allPlans = listAllPlansService()

        return res.status(200).json(allPlans)
        
    } catch (error) {
        if(error instanceof AppError){


        }
    }
}