import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { hashSync } from "bcrypt";
import { ISupervisorsUpdate } from "../../interfaces/supervisors";
import { AppError } from "../../errors/appError";

export const supervisorsUpdateSchema: SchemaOf<ISupervisorsUpdate> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup
      .string()
      .transform((pws) => hashSync(pws, 10))
      .notRequired(),
    telephone: yup.string().notRequired(),
    is_active: yup.boolean().notRequired(),
    is_manager: yup.boolean().notRequired(),
  });

export const validateSupervisorsUpdate =
  (schema: SchemaOf<ISupervisorsUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataSupervisorsUpdate = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
