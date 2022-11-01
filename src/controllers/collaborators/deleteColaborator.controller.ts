import { Request, Response } from 'express';
import { deleteCollaboratorService }  from '../../services/colaboratorsServices/deleteColaborator.service';

const deleteCollaboratorController = async (req:Request, res:Response)  =>{
  
  const { id } = req.params;
  await deleteCollaboratorService(id);
  return res.status(203).send();

};

export default deleteCollaboratorController;