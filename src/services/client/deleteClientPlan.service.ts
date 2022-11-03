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

  const client = await clientRepository.findOneBy({
    id: clientId,
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const newClient = new Client();
};
