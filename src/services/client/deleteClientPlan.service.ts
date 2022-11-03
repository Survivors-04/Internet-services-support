import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Client_plan } from "../../entities/client_plan.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";

export const deleteClientPlanService = async (
  internet_plan_id: string,
  clientId: string
): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);

  const internetPlan = await internetPlanRepository.findOneBy({
    id: internet_plan_id,
  });

  const client = await clientRepository.findOne({
    where: {
      id: clientId,
      client_plan: internetPlan!,
    },
  });

  if (!client || !internetPlan) {
    throw new AppError("Client or internet plan not found", 404);
  }

  const clientPlan = client;
  clientPlan.client_plan = [];

  await clientRepository.save(clientPlan);
};
