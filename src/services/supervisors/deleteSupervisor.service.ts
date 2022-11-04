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

    console.log(selectedSupervisor)


    if(!selectedSupervisor){

        throw new AppError("Supervisor não encontrado")
        
    }

     selectedSupervisor.is_active = false

     console.log(selectedSupervisor)

     await supervisorsRepository.save(selectedSupervisor)

    return true

}
