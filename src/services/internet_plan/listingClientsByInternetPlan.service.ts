import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";

export const listingClientsByInternetPlanService = async (
  id: string
): Promise<Internet_plan> => {
  const clientsRepository = AppDataSource.getRepository(Client);
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);
  // const clients = await internetPlanRepository
  const plans = await internetPlanRepository.find({
    relations: { client_plan: true },
  });
  const internetPlan = plans.find((plan) => plan.id === id);

  if (!internetPlan) throw new AppError("internet plan not found", 409);

  return internetPlan;
};
