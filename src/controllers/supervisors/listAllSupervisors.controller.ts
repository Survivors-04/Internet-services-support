import {listAllSupervisorsService} from "../../services/supervisors/listAllSupervisors.service";
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/HandleError.middleware";

export const listAllSupervisorsController = (req: Request, res:Response)=>{


    try {
        const allSupervisors = listAllSupervisorsService()
    
        return res.status(200).json(allSupervisors)
        
    } catch (error) {
        if(error instanceof AppError){
            // handleErrorMiddleware("Erro", res)
        }
    }
}

