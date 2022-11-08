import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";

export const deleteSupervisorService = async (id: string) => {
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const selectedSupervisor = await supervisorsRepository.findOneBy({ id });

  if (!selectedSupervisor) {
    throw new AppError("Supervisor not found", 404);
  }
  if (selectedSupervisor.is_active === false) {
    throw new AppError("Supervisor not found");
  }

  await supervisorsRepository.save({
    id: selectedSupervisor.id,
    is_active: false,
  });

  return "Supervisor successfully deleted";
};
