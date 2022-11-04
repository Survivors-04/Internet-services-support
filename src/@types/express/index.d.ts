import * as express from "express";
import {
  IInternetPlan,
  IInternetPlanUpdate,
} from "../../interfaces/internetPlan";
import { IService, IUpdateService } from "../../interfaces/services";
import { ISupervisor } from "../../interfaces/supervisors";
import { ITeamValidateYup } from "../../interfaces/teams";

declare global {
  namespace Express {
    interface Request {
      dataService: IService;
      dataUpdateService: IUpdateService;
      dataInternetPlan: IInternetPlan;
      dataUpdateInternetPlan: IInternetPlanUpdate;
      dataTeam: ITeamValidateYup;
      dataAddCollaboratorInTeam: IAddCollaboratorInTeam;
      dataSupervisors: ISupervisor;
    }
  }
}
