import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";
import { IClient } from "../../interfaces/clients";

export const listingClientsByInternetPlanService = async (
  id: string
): Promise<IClient[]> => {
  const clientsRepository = AppDataSource.getRepository(Client);
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);

  const internetPlan = await internetPlanRepository.findOneBy({ id });
  const clients = await clientsRepository.find();

  if (!internetPlan) throw new AppError("internet plan not found", 409);

  const returnedClients = clients.filter(
    (elem) => elem.client_plan.filter((plan) => plan.id === id).length > 0
  );

  return returnedClients;
};
