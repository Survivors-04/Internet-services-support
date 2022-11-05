import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";
import { IUpdateSupervisorRequest } from "../../interfaces/supervisors";



export const updateSupervisorService = async ({
  id,
  telephone,
  email,
  is_manager,
  password,
}: IUpdateSupervisorRequest) => {
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const selectedSupervisor = await supervisorsRepository.findOneBy({
    id,
  });

  if (!selectedSupervisor) {
    throw new AppError("Usuário não encontrado");
  }

  await supervisorsRepository.update(id, {
    telephone: telephone ? telephone : selectedSupervisor.telephone,
    email: email ? email : selectedSupervisor.email,
    is_manager: is_manager ? is_manager : selectedSupervisor.is_manager,
    password: password ? password : selectedSupervisor.password,
  });

  const userUpdated = await supervisorsRepository.findOneBy({
    id,
  });

  return userUpdated;
};


