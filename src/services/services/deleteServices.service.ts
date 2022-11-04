import { AppDataSource } from "../../data-source";
import { Services } from "../../entities/services.entity";
import { AppError } from "../../errors/appError";

export const deleteServicesService = async (id: string): Promise<string> => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const service = await serviceRepository.findOne({ where: { id } });

  if (!service) throw new AppError("service not found", 409);

  await serviceRepository.delete({ id });

  return "service deleted successfully";
};
