import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { hashSync } from "bcrypt";
import { AppError } from "../../errors/appError";
import { ICollaboratorUpdateYup } from "../../interfaces/collaborator";

export const collaboratorUpdateSchema: SchemaOf<ICollaboratorUpdateYup> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup
      .string()
      .transform((pws) => hashSync(pws, 10))
      .notRequired(),
    telephone: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
  });

export const validateColaboratorUpdate =
  (schema: SchemaOf<ICollaboratorUpdateYup>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataUpdateCollaborator = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
