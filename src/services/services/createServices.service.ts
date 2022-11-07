import { AppDataSource } from "../../data-source";
import { Services } from "../../entities/services.entity";
import { AppError } from "../../errors/appError";
import { IService } from "../../interfaces/services";

export const createServicesService = async (
  data: IService
): Promise<Services> => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const findedService = await serviceRepository.findOne({
    where: { name: data.name },
  });

  if (findedService) throw new AppError("service already registered", 409);

  const service = serviceRepository.create({ ...data });

  await serviceRepository.save(service);

  return service;
};
