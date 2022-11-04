import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUpdateService } from "../../interfaces/services";
import { AppError } from "../../errors/appError";
import { IInternetPlanUpdate } from "../../interfaces/internetPlan";

export const internetPlanUpdateSchema: SchemaOf<IInternetPlanUpdate> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    price: yup.number().notRequired(),
  });

export const validateInternetPlanUpdate =
  (schema: SchemaOf<IInternetPlanUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataUpdateInternetPlan = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
