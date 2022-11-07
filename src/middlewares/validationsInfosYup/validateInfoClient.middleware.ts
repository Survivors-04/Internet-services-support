import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../errors/appError";
import { IClient } from "../../interfaces/clients";
import { hashSync } from "bcrypt";

export const clientCreateSchema: SchemaOf<IClient> = yup.object().shape({
  id: yup
    .string()
    .transform(() => uuidv4())
    .default(() => uuidv4())
    .notRequired(),
  name: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().required(),
  password: yup
    .string()
    .transform((pws) => hashSync(pws, 10))
    .required(),
  telephone: yup.string().required(),
  created_date: yup
    .date()
    .default(() => new Date())
    .transform(() => new Date())
    .notRequired(),
  updated_date: yup
    .date()
    .default(() => new Date())
    .transform(() => new Date())
    .notRequired(),
  is_active: yup
    .boolean()
    .default(() => true)
    .transform(() => true)
    .notRequired(),
});

export const validateClientCreate =
  (schema: SchemaOf<IClient>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataClient = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
