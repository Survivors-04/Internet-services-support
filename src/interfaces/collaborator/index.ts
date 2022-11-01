import { Attendance } from "../../entities/attendance.entity"
import { Team } from "../../entities/team.entity"

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
export interface IColaboratorResponse extends ICollaboratorUpdateRequest{
  id: string;
  cpf: number;
  team: Team;
  attendance: Attendance[];
}