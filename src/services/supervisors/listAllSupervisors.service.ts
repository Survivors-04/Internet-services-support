import { AppDataSource } from "../../data-source"
import { Supervisor } from "../../entities/supervisor.entity"


export const listAllSupervisorsService = async ()=>{

    const supervisorRepository = AppDataSource.getRepository(Supervisor)

    const allSupervisors = await supervisorRepository.find()

    return allSupervisors

}
