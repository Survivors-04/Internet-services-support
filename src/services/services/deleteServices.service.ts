import { AppDataSource } from "../../data-source";
import { Services } from "../../entities/services.entity";
import { AppError } from "../../errors/appError";

export const deleteServicesService = async (id: string): Promise<void> => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const service = await serviceRepository.findOne({ where: { id } });

  if (!service) throw new AppError("service not found", 404);

  await serviceRepository.delete({ id });
};
