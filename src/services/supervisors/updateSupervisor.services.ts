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
  is_active,
}: IUpdateSupervisorRequest) => {
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);
  const selectedSupervisor = await supervisorsRepository.findOneBy({ id });

  if (!selectedSupervisor) {
    throw new AppError("Usuário não encontrado", 400);
  }

  await supervisorsRepository.update(id, {
    telephone: telephone ? telephone : selectedSupervisor.telephone,
    email: email ? email : selectedSupervisor.email,
    is_manager: is_Manager ? is_Manager : selectedSupervisor.is_manager,
    password: password ? password : selectedSupervisor.password,
    is_active: is_active ? is_active : selectedSupervisor.is_active,
  });

  const userUpdated = await supervisorsRepository.findOneBy({ id });
  return userUpdated;
};
