import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/HandleError.middleware";
import {createSupervisorService} from "../../services/supervisors/createSupervisorService.services";

import { instanceToPlain } from "class-transformer";

const createSupervisorsController = async (req: Request, res: Response)=>{
        const {name, cpf, telephone, email, isManager, password} = req.body
    try {

        const newSupervisor = await createSupervisorService({name, cpf, telephone, email, isManager, password})
    
        
        return res.status(200).json(instanceToPlain(newSupervisor))
        
    } catch (error) {

        if(error instanceof AppError){
            // handleErrorMiddleware(error, res)
        }
        
    }


}

export default createSupervisorsController