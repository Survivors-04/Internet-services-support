import { AppDataSource } from "../../data-source";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";
import {
  IInternetPlan,
  IInternetPlanUpdate,
} from "../../interfaces/internetPlan";

export const updateInternetPlanService = async (
  id: string,
  data: IInternetPlanUpdate
): Promise<IInternetPlan> => {
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);

  const internetPlan = await internetPlanRepository.findOneBy({ id });

  if (!internetPlan) throw new AppError("internet plan not found", 409);

  await internetPlanRepository.update(id, {
    name: data.name ? data.name : internetPlan.name,
    description: data.description ? data.description : internetPlan.description,
    price: data.price ? data.price : internetPlan.price,
  });

  const updatedInternetPlan = await internetPlanRepository.findOneBy({ id });

  return updatedInternetPlan!;
};
