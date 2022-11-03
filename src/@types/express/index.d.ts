import * as express from "express";
import { IService, IUpdateService } from "../../interfaces/services";

declare global {
  namespace Express {
    interface Request {
      dataService: IService;
      dataUpdateService: IUpdateService;
    }
  }
}
