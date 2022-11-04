import {listAllSupervisorsService} from "../../services/supervisors/listAllSupervisors.service";
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/HandleError.middleware";

export const listAllSupervisorsController = (req: Request, res:Response)=>{

    const allSupervisors = listAllSupervisorsService()

    return res.status(200).json(allSupervisors)

}

