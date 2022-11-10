import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { Client_plan } from "../../entities/client_plan.entity";
import { AppError } from "../../errors/appError";
import { v4 as uuid } from "uuid";
import { IAddingOrRemovingPlanToClient } from "../../interfaces/clients";

export const createClientPlanService = async (
  { internet_plan_id }: IAddingOrRemovingPlanToClient,
  clientId: string
): Promise<void> => {
  const clientPlanRepository = AppDataSource.getRepository(Client_plan);
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id: clientId,
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const internetPlan = await internetPlanRepository.findOneBy({
    id: internet_plan_id,
  });

  if (!internetPlan) {
    throw new AppError("Internet plan not found", 404);
  }

  
  const clientPlan = await clientPlanRepository.findOne({
    where: {
      internet_plan: internetPlan,
      id: clientId
    },
  });

  const teste = client.client_plan.find(e => e.internet_plan.id === internet_plan_id )
  
  if (teste) {
    throw new AppError("The customer already has this plan", 400);
  }

  await clientPlanRepository.save({
    id: uuid(),
    client,
    internet_plan: internetPlan,
  });
};
