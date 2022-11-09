import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";
import { ITeamValidateYup } from "../../interfaces/teams";

export const createTeamService = async (
  data: ITeamValidateYup
): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);
  
  const supervisor = await supervisorsRepository.findOneBy({
    id: data.supervisorId,
  });

  if (!supervisor) throw new AppError("supervisor not found", 404);

  const teams = await teamRepository.find();
 const supervisorAlreadyInTeam = teams.find((team)=>team.supervisor.id === supervisor.id) 
 
  if (supervisorAlreadyInTeam)
    throw new AppError("supervisor is already in a team");
   
const newTeams = new Team()
newTeams.supervisor = supervisor
newTeams.collaborator = []


const team = teamRepository.create(newTeams);
await teamRepository.save(newTeams);

  return team;
};
