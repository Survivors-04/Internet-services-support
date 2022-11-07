import {deleteSupervisorService} from "../../services/supervisors/deleteSupervisor.service"
import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"


export const deleteSupervisorControler = async (req: Request, res: Response)=>{

    const {id} = req.params

    const deleteSupervisor = await deleteSupervisorService(id)

    return res.status(201).json(instanceToPlain(("Supervisor deleted")))

}


