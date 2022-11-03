import { Request, Response } from "express"
import { listPlansByIdService } from "../../services/internet_plan/listPlansById.services"


export const listPlansByIdController = (req: Request, res: Response)=>{

    const {id} = req.params

    const plansById = listPlansByIdService({id})


}