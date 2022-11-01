import { Attendance } from "../../entities/attendance.entity"
import { Team } from "../../entities/team.entity"

export interface IColaboratorResponse{
  id: string;
  name: string;
  email: string;
  cpf: number;
  telephone: number;
  team: Team;
  attendance: Attendance[];
}
export interface ICollaboratorUpdateRequest{
  name: string
  email: string
  telephone: number
} 

export interface IColaboratorRequest extends ICollaboratorUpdateRequest{
  cpf:number
  email: string
  password: string
  isActive: boolean
}