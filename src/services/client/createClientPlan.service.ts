import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { Client_plan } from "../../entities/client_plan.entity";
import { AppError } from "../../errors/appError";

export const createClientPlanService = async (
  internet_plan_id: string,
  clientId: string
): Promise<void> => {
  const clientPlanRepository = AppDataSource.getRepository(Client_plan);
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id: clientId,
  });

  const internetPlan = await internetPlanRepository.findOneBy({
    id: internet_plan_id,
  });

  if (!internetPlan || !client) {
    throw new AppError("Client or internet plan not found", 404);
  }

  await clientPlanRepository.save({
    client,
    internet_plan: internetPlan,
  });
};
