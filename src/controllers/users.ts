import {Request, Response} from "express"
import { userModel } from "../models/users";
import { badrequest, internalServerError } from "../services/util";

const insertUser = (req: Request, res: Response) =>{

    {
        const user = req.body;
        if(!user)
        return badrequest(res, "invalid user")

        if(!user.name)
        return badrequest(res, "invalid name")

        if(!user.password)
        return badrequest(res, "invalid password")

    }

        userModel.insertUser(req.body)
        .then(()=>{
            res.json({
                postResponse: req.body
            })
        })
        .catch(err => internalServerError(res, err))
}


const listUsers = (req: Request, res:Response) =>{
        userModel.listUsers()
        .then((users)=>{
            res.json({
                users
            })
        })
        .catch(err => internalServerError(res, err))
}


const getUser = (req: Request, res:Response) =>{
    
    const id = parseInt(req.params.id);

    userModel.getUser(id)
    .then((users)=>{
        res.json({
                users
        })
    })
    .catch(err => internalServerError(res, err))
}


const deleteUser = (req: Request, res:Response) =>{
    
    const id = parseInt(req.params.id);
    userModel.deleteUser(id)
    .then(()=>{
       res.json({
        res: "deleted"
       })
    })
    .catch(err => internalServerError(res, err))
}



const updateUser = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);

    {
        const user = req.body;
        if(!user)
        return badrequest(res, "invalid user")

        if(!user.name)
        return badrequest(res, "invalid name")

        if(!user.password)
        return badrequest(res, "invalid password")

       const userSaved = await userModel.getUser(id)
            if(!userSaved)
       return (res: Response, err:string) =>{
        res.status(400).json({
            err
        })
    }}


    userModel.updateUser(req.body)
        .then((users)=>{
            res.json({
                updateResponse: req.body
            })
        })
        .catch(err => internalServerError(res, err))
}

const getLogin = (req: Request, res: Response) =>{
    
    userModel.getLogin(req.body)

        
        .then((users)=>{
            res.json({
                getLogin: "login ok"
            })
        })
        .catch(err => internalServerError(res, err))
}

export const userController = {
    insertUser,
    listUsers,
    getUser,
    deleteUser,
    updateUser,
    getLogin
    

}