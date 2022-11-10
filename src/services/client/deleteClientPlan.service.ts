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
  const plansRepository = AppDataSource.getRepository(Internet_plan);

  const plan = await plansRepository.findOneBy({
    id: internet_plan_id,
  });

  const client = await clientRepository.findOneBy({
    id: clientId,
  });

  if (!plan || !client) {
    throw new AppError("Client or internet plan not found", 404);
  }

  console.log(plan);
  console.log(client);

  const clientPlan = client.client_plan.findIndex(
    (elem) => elem.internet_plan.id === plan.id
  );

  console.log(clientPlan);

  if (clientPlan === -1) {
    throw new AppError("Client or internet plan not found", 404);
  }

  client.client_plan.splice(clientPlan, 1);

  await clientRepository.save(client);

  /*  const clientPlanInTable = await clientPlanRepository.findOneBy({
    id: internet_plan_id,
  });

  await clientPlanRepository.delete(clientPlanInTable!); */
};
