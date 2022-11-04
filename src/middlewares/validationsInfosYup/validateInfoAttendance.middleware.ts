import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/appError";
import { IAttendanceRequest } from "../../interfaces/attendances";

export const attendanceCreateSchema: SchemaOf<IAttendanceRequest> = yup
  .object()
  .shape({
    client_id: yup.string().required(),
    collaborator_id: yup.string().required(),
    service_id: yup.string().required(),
    date: yup
      .date()
      .transform(() => new Date())
      .default(() => new Date())
      .notRequired(),
  });

export const validateAttendanceCreate =
  (schema: SchemaOf<IAttendanceRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.dataAttendance = validatedData;

        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "), 400);
      }
    } catch (err) {
      next(err);
    }
  };
