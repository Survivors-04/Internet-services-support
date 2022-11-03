import { AppDataSource } from "../../data-source";
import { Services } from "../../entities/services.entity";
import { IService } from "../../interfaces/services";

export const listingServicesService = async (): Promise<IService[]> => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const services = await serviceRepository.find();

  return services;
};
