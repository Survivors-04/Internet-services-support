import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";
import { IUpdateSupervisorRequest } from "../../interfaces/supervisors";



export const updateSupervisorService = async ({
  id,
  telephone,
  email,
  is_Manager,
  password,
}: IUpdateSupervisorRequest) => {
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const selectedSupervisor = await supervisorsRepository.findOneBy({
    id,
  });

  console.log(selectedSupervisor)

  if (!selectedSupervisor) {
    throw new AppError("Usuário não encontrado");
  }

  await supervisorsRepository.update(id, {
    telephone: telephone ? telephone : selectedSupervisor.telephone,
    email: email ? email : selectedSupervisor.email,
    is_manager: is_Manager ? is_Manager : selectedSupervisor.is_manager,
    password: password ? password : selectedSupervisor.password,
  });

  console.log(selectedSupervisor)
  const userUpdated = await supervisorsRepository.findOneBy({
    id,
  });

  return userUpdated;
};


