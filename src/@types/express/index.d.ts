import * as express from "express";
import {
  IInternetPlan,
  IInternetPlanUpdate,
} from "../../interfaces/internetPlan";
import { IService, IUpdateService } from "../../interfaces/services";

declare global {
  namespace Express {
    interface Request {
      dataService: IService;
      dataUpdateService: IUpdateService;
      dataInternetPlan: IInternetPlan;
      dataUpdateInternetPlan: IInternetPlanUpdate;
    }
  }
}
