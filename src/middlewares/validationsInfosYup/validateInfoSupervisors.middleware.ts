import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { v4 as uuidv4 } from "uuid";
import { hashSync } from "bcrypt";
import { ISupervisor, ISupervisorsRequest } from "../../interfaces/supervisors";
import { AppError } from "../../errors/appError";

export const supervisorsCreateSchema: SchemaOf<ISupervisor> = yup
  .object()
  .shape({
    id: yup
      .string()
      .default(() => uuidv4())
      .transform(() => uuidv4())
      .notRequired(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .transform((pws) => hashSync(pws, 10))
      .required(),
    cpf: yup.string().required(),
    telephone: yup.string().required(),
    is_active: yup
      .boolean()
      .default(() => true)
      .transform(() => true)
      .notRequired(),
    is_manager: yup.boolean().required(),
  });

export const validateSupervisorsCreate =
  (schema: SchemaOf<ISupervisor>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataSupervisors = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
