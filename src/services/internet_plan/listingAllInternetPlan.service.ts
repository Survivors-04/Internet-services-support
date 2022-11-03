import { AppDataSource } from "../../data-source";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { IInternetPlan } from "../../interfaces/internetPlan";

export const listingAllInternetPlanService = async (): Promise<
  IInternetPlan[]
> => {
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);
  const InternetPlans = await internetPlanRepository.find();

  return InternetPlans;
};
