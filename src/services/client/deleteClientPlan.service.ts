import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Client_plan } from "../../entities/client_plan.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";

export const deleteClientPlanService = async (
  internet_plan_id: string,
  clientId: string
): Promise<void> => {
  const clientPlanRepository = AppDataSource.getRepository(Client_plan);
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);

  const clientPlan = await clientPlanRepository.findOneBy({
    id: internet_plan_id,
  });

  if (!clientPlan) throw new AppError("internet plan not found", 404);

  await clientPlanRepository.delete(clientPlan);
};
