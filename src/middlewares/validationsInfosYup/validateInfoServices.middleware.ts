import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { v4 as uuidv4 } from "uuid";
import { IService } from "../../interfaces/services";
import { AppError } from "../../errors/appError";

export const serviceCreateSchema: SchemaOf<IService> = yup.object().shape({
  id: yup
    .string()
    .default(() => uuidv4())
    .transform(() => uuidv4())
    .notRequired(),
  name: yup.string().required(),
  description: yup.string().required(),
});

export const validateServiceCreate =
  (schema: SchemaOf<IService>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataService = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
