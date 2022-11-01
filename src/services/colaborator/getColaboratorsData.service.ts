import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";

const getColaboratorsDataService = async ( id:string ):Promise<Collaborator | Collaborator[]> =>{
  
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);

  if( id ){ 
    
    const collaborator = await collaboratorsRepo.findOneBy({ id:id });

    if( !collaborator ){ throw new AppError("Invalid id!", 404); };

    return collaborator 
  };

  const collaborators = await  collaboratorsRepo.find();

  return collaborators;
}; 
export { getColaboratorsDataService };