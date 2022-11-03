import { AppDataSource } from "../../data-source";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";
import {
  IInternetPlan,
  IInternetPlanUpdate,
} from "../../interfaces/internetPlan";

export const deleteInternetPlanService = async (
  id: string
): Promise<string> => {
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);

  const internetPlan = await internetPlanRepository.findOneBy({ id });

  if (!internetPlan) throw new AppError("internet plan not found", 409);

  await internetPlanRepository.delete({ id });

  return "internet plan deleted successfully";
};
