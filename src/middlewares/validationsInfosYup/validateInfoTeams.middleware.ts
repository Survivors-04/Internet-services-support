import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../errors/appError";
import { ITeamValidateYup } from "../../interfaces/teams";

export const teamCreateSchema: SchemaOf<ITeamValidateYup> = yup.object().shape({
  id: yup
    .string()
    .default(() => uuidv4())
    .transform(() => uuidv4())
    .notRequired(),
  supervisorId: yup.string().required(),
  collaborator: yup
    .array()
    .transform(() => [])
    .default(() => [])
    .notRequired(),
});

export const validateTeamCreate =
  (schema: SchemaOf<ITeamValidateYup>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataTeam = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
