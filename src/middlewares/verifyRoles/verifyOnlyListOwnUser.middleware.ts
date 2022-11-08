import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { AppError } from "../../errors/appError";

export const verifyOnlyListOwnUserMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    const idParams = req.params.id
    
    if(req.user.id === idParams){
        return next()
    }
    // console.log(req.user.role>=2)
    if(req.user.role >= 2){
        return next()
    }else{
        // console.log("teste")
        throw new AppError("User must be atleast Colaborator", 403)
    }

       
    }

