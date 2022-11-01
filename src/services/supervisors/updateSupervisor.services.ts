import { AppDataSource } from "../../data-source"
import { Supervisor } from "../../entities/supervisor.entity"
import { AppError } from "../../errors/appError"

interface IUpdateSupervisorRequest{
    id: string,
    telephone: number,
    email: string,
    is_Manager: boolean,
    password: string,
    is_active: boolean
}

const updateSupervisorService = async ({id, telephone, email, is_Manager, password}:IUpdateSupervisorRequest)=>{

    const supervisorsRepository = AppDataSource.getRepository(Supervisor)


    const selectedSupervisor = await supervisorsRepository.findOneBy({
        id
    })

    if(!selectedSupervisor){
        throw new AppError("Usuário não encontrado", 400)
    }

    await supervisorsRepository.update(id,{
        telephone: telephone? telephone: selectedSupervisor.telephone,
        email: email? email: selectedSupervisor.email,
        is_manager: is_Manager? is_Manager: selectedSupervisor.is_manager,
        password: password? password: selectedSupervisor.password
        is_active: is_active? is_active: selectedSupervisor.is_active
    }
    )

    const userUpdated = await supervisorsRepository.findOneBy({
        id
    })


    return userUpdated

}

export default updateSupervisorService