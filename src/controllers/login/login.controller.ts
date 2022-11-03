import { loginService } from "../../services/login/login.services"
import { Request, Response } from "express"
import { AppError } from "../../errors/appError"

export const loginController = (req: Request, res: Response)=>{

    try {
        const {email, password} =  req.body
    
        const token = loginService({email, password})
    
        return res.status(200).json({token: token})
        
    } catch (error) {
        if(error instanceof AppError){
        }
    }


}