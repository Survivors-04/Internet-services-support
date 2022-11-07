import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/appError";
import { IAddCollaboratorInTeam } from "../../interfaces/teams";

export const addCollaboratorInTeamSchema: SchemaOf<IAddCollaboratorInTeam> = yup
  .object()
  .shape({
    collaboratorId: yup.string().required(),
  });

export const validateAddCollaboratorInTeam =
  (schema: SchemaOf<IAddCollaboratorInTeam>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataAddCollaboratorInTeam = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
