import { Request, Response } from "express";
import {getColaboratorsDataService} from '../../services/colaboratorsServices/getColaboratorsData.service';

const getCollaboratorsDataController = async (req: Request, res:Response)=>{
  const { id } = req.params; 
  const collabs = await getColaboratorsDataService( id );
  return res.status(200).json(collabs);
};

export default getCollaboratorsDataController;