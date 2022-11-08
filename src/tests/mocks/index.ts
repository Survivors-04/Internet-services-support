import {
  IColaboratorRequest,
  ICollaborator,
  ITeams,
  ICollaboratorLogin,
} from "../../interfaces/collaborator";
import {
  ISupervisorsLogin,
  ISupervisorsRequest,
} from "../../interfaces/supervisors";
import { IInternetPlanRequest } from "../../interfaces/internetPlan";
import { IServiceRequest } from "../../interfaces/services";
import { IClientLogin, IClientRequest } from "../../interfaces/clients";

export const mockedSupervisor: ISupervisorsRequest = {
  name: "Supervisor",
  email: "supervisor@mail.com",
  password: "supervisor123",
  cpf: "12345678901",
  telephone: "13984512783",
  is_manager: false,
};

export const mockedSupervisorLogin: ISupervisorsLogin = {
  email: "supervisor@mail.com",
  password: "supervisor123",
};

export const mockedSupervisorDeleted: ISupervisorsRequest = {
  name: "Supervisor",
  email: "supervisordeleted@mail.com",
  password: "supervisor123",
  cpf: "12345675911",
  telephone: "13984517583",
  is_manager: false,
};

export const mockedManager: ISupervisorsRequest = {
  name: "Manager",
  email: "manager@mail.com",
  password: "Manager123",
  cpf: "12345678901",
  telephone: "13984512783",
  is_manager: true,
};

export const mockedManagerLogin: ISupervisorsLogin = {
  email: "manager@mail.com",
  password: "Manager123",
};

export const mockedInternetPlans: IInternetPlanRequest = {
  name: "Teste",
  description: "Teste123",
  price: 400.0,
};

export const mockedInternetPlans2: IInternetPlanRequest = {
  name: "Teste2",
  description: "Teste1234",
  price: 400.0,
};

export const mockedCollaborator: ICollaborator = {
  name: "Teste",
  cpf: "12345678901",
  telephone: "13984512783",
  email: "collaborator@mail.com",
  password: "Teste123",
  is_active: true,
};

export const mockedCollaboratorLogin: ICollaboratorLogin = {
  email: "teste@mail.com",
  password: "Teste123",
};

export const mockedAttendance = {
  collaboratorId: "",
  clientId: "",
  serviceId: "",
};

export const mockedService: IServiceRequest = {
  name: "Test",
  description: "Description",
};

export const mockedClient: IClientRequest = {
  name: "Client",
  cpf: "12345678901",
  telephone: "13984512783",
  email: "client@mail.com",
  password: "Client123",
  is_active: true,
};

export const mockedClientDeleted: IClientRequest = {
  name: "Client",
  cpf: "12345632401",
  telephone: "13984545983",
  email: "clientdeleted@mail.com",
  password: "Client123",
  is_active: true,
};

export const mockedClientLogin: IClientLogin = {
  email: "client@mail.com",
  password: "Client123",
};

export const mockedTeams = {
  supervisorId: "",
  collaboratorId: "",
};

export const collaboratorTeam: ICollaborator = {
  name: "Collaborator",
  email: "collaborator9@mail.com",
  password: "collaborator9",
  cpf: "193799542119",
  telephone: "999999999",
  is_active: true,
};

export const collaboratorTeam2: ICollaborator = {
  name: "Collaborator",
  email: "collaborator9@mail.com",
  password: "collaborator9",
  cpf: "193799542119",
  telephone: "999999999",
  is_active: true,
};

export const supervisorTeam: ISupervisorsRequest = {
  name: "Supervisor",
  email: "supervisor6@mail.com",
  password: "supervisor6",
  cpf: "1997847230165",
  telephone: "999999999",
  is_manager: false,
};
