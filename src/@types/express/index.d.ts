import * as express from "express";
import { IAttendanceRequest } from "../../interfaces/attendances";
import {
  IAddingOrRemovingPlanToClient,
  IClient,
  IClientUpdate,
} from "../../interfaces/clients";
import {
  IColaboratorRequest,
  ICollaboratorUpdateYup,
} from "../../interfaces/collaborator";
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
      dataClient: IClient;
      dataAttendance: IAttendanceRequest;
      dataCollaborator: IColaboratorRequest;
      dataUpdateCollaborator: ICollaboratorUpdateYup;
      dataAddOrRemovePlanInClient: IAddingOrRemovingPlanToClient;
      dataClientUpdate: IClientUpdate;
      user: {
        id: string;
        role: number;
        is_active: boolean;
      };
    }
  }
}
