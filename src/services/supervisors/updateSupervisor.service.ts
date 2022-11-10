import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";
import {
  ISupervisorsUpdate,
  IUpdateSupervisorRequest,
} from "../../interfaces/supervisors";
export const updateSupervisorService = async (
  id: string,
  data: ISupervisorsUpdate
) => {
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const selectedSupervisor = await supervisorsRepository.findOneBy({
    id,
  });
  const key = Object.keys(data);
  if (!selectedSupervisor) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (
    key.includes("is_active") ||
    key.includes("id") ||
    key.includes("is_manager")
  ) {
    throw new AppError("unauthorized ", 401);
  }

  await supervisorsRepository.update(id, {
    name: data.name ? data.name : selectedSupervisor.name,
    telephone: data.telephone ? data.telephone : selectedSupervisor.telephone,
    email: data.email ? data.email : selectedSupervisor.email,
    password: data.password ? data.password : selectedSupervisor.password,
    is_manager: data.is_manager
      ? data.is_manager
      : selectedSupervisor.is_manager,
  });

  const userUpdated = await supervisorsRepository.findOneBy({
    id,
  });

  return userUpdated;
};
