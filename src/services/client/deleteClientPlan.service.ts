import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Client_plan } from "../../entities/client_plan.entity";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";
import { IAddingOrRemovingPlanToClient } from "../../interfaces/clients";

export const deleteClientPlanService = async (
  { internet_plan_id }: IAddingOrRemovingPlanToClient,
  clientId: string
): Promise<void> => {
  const clientPlanRepository = AppDataSource.getRepository(Client_plan);
  const clientRepository = AppDataSource.getRepository(Client);

  const clientPlan = await clientPlanRepository.findOneBy({
    id: internet_plan_id,
  });
  console.log(clientPlan)

  const client = await clientRepository.findOneBy({
    id: clientId,
  });

  if (!clientPlan || !client) {
    throw new AppError("Client or internet plan not found", 404);
  }
  await clientPlanRepository.delete(clientPlan);
};
