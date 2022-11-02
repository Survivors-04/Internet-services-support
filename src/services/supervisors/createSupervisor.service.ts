import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { Supervisor } from "../../entities/supervisor.entity"
import { ICreateSupervisorRequest } from "../../interfaces/supervisors"

// importar entidade Sueprvisors



const createSupervisorService = async ({name, cpf, telephone, email, isManager, password}: ICreateSupervisorRequest)=>{

    const supervisorsRepository = AppDataSource.getRepository(Supervisor)

    const supervisor = await supervisorsRepository.find()

    const verifyIfAlreadyExists = supervisor.find(supervisor=>supervisor.email === email)

    if(verifyIfAlreadyExists){
        throw new AppError("O email já está em uso", 400)
    }

    const newSupervisor = new Supervisor()

    newSupervisor.name = name
    newSupervisor.cpf = cpf
    newSupervisor.telephone = telephone
    newSupervisor.email = email
    newSupervisor.is_manager = isManager
    newSupervisor.password = password

    supervisorsRepository.create(newSupervisor)
    await supervisorsRepository.save(newSupervisor)

    return newSupervisor

}

export default createSupervisorService