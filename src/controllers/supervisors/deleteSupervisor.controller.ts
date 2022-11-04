import {deleteSupervisorService} from "../../services/supervisors/deleteSupervisor.service"
import { Request, Response } from "express"


export const deleteSupervisorControler = async (req: Request, res: Response)=>{

    const {id} = req.params

    const deleteSupervisor = await deleteSupervisorService(id)

    return res.status(201).json("Supervisor deleted")

}


