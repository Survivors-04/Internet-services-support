import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/appError";
import { IClientUpdate } from "../../interfaces/clients";
import { hashSync } from "bcrypt";

export const clientUpdateSchema: SchemaOf<IClientUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().notRequired(),
  password: yup
    .string()
    .transform((pws) => hashSync(pws, 10))
    .notRequired(),
  telephone: yup.string().notRequired(),
});

export const validateClientUpdate =
  (schema: SchemaOf<IClientUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataClientUpdate = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
