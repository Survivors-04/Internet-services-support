import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { v4 as uuidv4 } from "uuid";
import { hashSync } from "bcrypt";
import { AppError } from "../../errors/appError";
import { IColaboratorRequest } from "../../interfaces/collaborator";

export const collaboratorCreateSchema: SchemaOf<IColaboratorRequest> = yup
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
    isActive: yup
      .boolean()
      .default(() => true)
      .transform(() => true)
      .notRequired(),
  });

export const validateCollaboratorCreate =
  (schema: SchemaOf<IColaboratorRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataCollaborator = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
