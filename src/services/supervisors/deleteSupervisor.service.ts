import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";

export const deleteSupervisorService = async (id: string) => {
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const selectedSupervisor = await supervisorsRepository.findOneBy({ id });

  if (!selectedSupervisor) {
    throw new AppError("Supervisor não encontrado");
  }
  if (!selectedSupervisor.is_active) {
    throw new AppError("user not found");
  }

  await supervisorsRepository.save({
    id: selectedSupervisor.id,
    is_active: false,
  });
};
