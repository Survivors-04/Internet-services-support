import { Request, Response} from 'express';
import { updateColaboratorService } from '../../services/colaboratorsServices/updateColaborator.service';

const updateCollaboratorController = async (req:Request, res: Response) => {

  const data = req.body;
  const {id} = req.params;
  const updatedData = updateColaboratorService(data, id);
  return res.status(200).json(updatedData);

}; 

export default updateCollaboratorController;