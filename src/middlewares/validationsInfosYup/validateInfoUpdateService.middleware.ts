import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUpdateService } from "../../interfaces/services";
import { AppError } from "../../errors/appError";

export const serviceUpdateSchema: SchemaOf<IUpdateService> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
  });

export const validateServiceUpdate =
  (schema: SchemaOf<IUpdateService>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataUpdateService = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
