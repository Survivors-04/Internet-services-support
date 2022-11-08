import { AppDataSource } from "../../data-source";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";

export const deleteInternetPlanService = async (
  id: string
): Promise<void> => {
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);

  const internetPlan = await internetPlanRepository.findOneBy({ id });

  if (!internetPlan) throw new AppError("internet plan not found", 404);

  await internetPlanRepository.delete({ id });

  
};
