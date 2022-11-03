import { AppDataSource } from "../../data-source";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { AppError } from "../../errors/appError";
import { IInternetPlan } from "../../interfaces/internetPlan";

export const createInternetPlanService = async (
  data: IInternetPlan
): Promise<IInternetPlan> => {
  const internetPlanRepository = AppDataSource.getRepository(Internet_plan);
  const findedInternetPlan = await internetPlanRepository.findOne({
    where: {
      name: data.name,
    },
  });

  if (findedInternetPlan)
    throw new AppError("internet plan already registered", 409);

  const internetPlan = internetPlanRepository.create({ ...data });

  await internetPlanRepository.save(internetPlan);

  return internetPlan;
};
