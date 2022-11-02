import { AppDataSource } from "../../data-source"
import { Supervisor } from "../../entities/supervisor.entity"
import { AppError } from "../../errors/appError"



export const deleteSupervisorService = async (id:string)=>{

    const supervisorsRepository = AppDataSource.getRepository(Supervisor)

    const selectedSupervisor = await supervisorsRepository.findOne({
        where: {
            id: id
        }
    })

    if(!selectedSupervisor){

        throw new AppError("Supervisor não encontrado", 400)
        
    }

    // selectedSupervisor.is_active = false

    // await AppDataSource.createQueryBuilder().delete().from(Supervisor).where("id = :id", { id: 1 }).execute()

    return true
    // const userDeleted = allSupervisors.filter(supervisor=>supervisor.id === id)


}
