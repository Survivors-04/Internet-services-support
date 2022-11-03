import { AppDataSource } from "../../data-source";
import { Services } from "../../entities/services.entity";
import { AppError } from "../../errors/appError";
import { IUpdateService } from "../../interfaces/services";

export const updateServicesService = async (
  id: string,
  data: IUpdateService
): Promise<Services> => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const service = await serviceRepository.findOne({
    where: { id },
  });

  if (!service) throw new AppError("service not found", 409);

  await serviceRepository.update(id, {
    name: data.name ? data.name : service.name,
    description: data.description ? data.description : service.description,
  });

  const updatedService = await serviceRepository.findOne({
    where: { id },
  });

  return updatedService!;
};
