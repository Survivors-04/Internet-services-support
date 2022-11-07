import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/appError";
import { IAddingOrRemovingPlanToClient } from "../../interfaces/clients";

export const addOrRemovePlanInClientSchema: SchemaOf<IAddingOrRemovingPlanToClient> =
  yup.object().shape({
    internet_plan_id: yup.string().required(),
  });

export const validateAddOrRemovePlanInClient =
  (schema: SchemaOf<IAddingOrRemovingPlanToClient>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataAddOrRemovePlanInClient = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
