import {listAllSupervisorsService} from "../../services/supervisors/listAllSupervisors.service";
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/HandleError.middleware";


export const listAllSupervisorsController = async (req: Request, res:Response)=>{

        const allSupervisors = await listAllSupervisorsService()
    
        return res.status(200).json(allSupervisors)
        
   
}

