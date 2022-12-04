import { Request, Response } from "express"
import { userModel } from "../models/users";
import { badrequest, internalServerError } from "../services/util";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const insertUser = async (req: Request, res: Response) => {

    {   //Empty field validation
        const user = req.body;
        if (!user)
            return badrequest(res, "invalid user")

        if (!user.name)
            return badrequest(res, "invalid name")

        if (!user.password)
            return badrequest(res, "invalid password")

    }
    //generating password hash
    let bcryptPassword = await bcrypt.hash(req.body.password, 10)

    let body = req.body

    //assigning password hash to req.body
    body = {
        id: req.body.id,
        name: req.body.name,
        password: bcryptPassword,
        logged: req.body.logged
    }

    await userModel.insertUser(body)

        .then((user) => {
            res.json({
                newUser: user
            })
        })
        .catch(err => internalServerError(res, err))
}


const listUsers = async (req: Request, res: Response) => {
    await userModel.listUsers()
        .then((users) => {
            res.json({
                users
            })

        })
        .catch(err => internalServerError(res, err))
}


const getUser = (req: Request, res: Response) => {

    //Verifing if the id comes inside req.param
    const id = parseInt(req.params.id);

    userModel.getUser(id)
        .then((users) => {
            res.json({
                users
            })
        })
        .catch(err => internalServerError(res, err))
}


const deleteUser = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    userModel.deleteUser(id)
        .then(() => {
            res.json({
                res: "User Deleted"
            })
        })
        .catch(err => internalServerError(res, err))
}

const updateUser = async (req: Request, res: Response) => {

    //Verifing if the id comes inside req.param
    //const id = parseInt(req.params.id);

    {   //Empty field validation
        const user = req.body;
        if (!user)
            return badrequest(res, "invalid user")

        if (!user.name)
            return badrequest(res, "invalid name")

        if (!user.password)
            return badrequest(res, "invalid password")

    }
    //generating password hash
    let bcryptPassword = await bcrypt.hash(req.body.password, 10)

    let body = req.body

    //assigning password hash to req.body
    body = {
        id: req.body.id,
        name: req.body.name,
        password: bcryptPassword,
        logged: req.body.logged
    }
    await userModel.updateUser(body)
        .then((users) => {
            res.json({
                updateResponse: users
            })
        })
        .catch(err => internalServerError(res, err))
}

const login = async (req: Request, res: Response) => {

    {  //Empty field validation
        if (!req.body.name)
            return badrequest(res, "invalid user")

        if (!req.body.password)
            return badrequest(res, "invalid name")
    }
    //Calling the login function from model
    const userLogin = await userModel.login(req.body)

        .then(async (user) => {

            //Verifing encripted password
            //CheckPass returns true or false
            const checkPass = await bcrypt.compare(req.body.password, user.password)
            console.log(checkPass)

            if (!checkPass) {
                return badrequest(res, "invalid password");
            }
            //Generating token
            const token = jwt.sign({ id: req.body.id }, process.env.JWT_PASS ?? "", { expiresIn: '8h' });
            res.json({
                user,
                token
            });
        })
        .catch(err => internalServerError(res, err))

}

const getProfile = (req: Request, res: Response) => {

    //Calling the getProfile function from model
    userModel.getProfile(req.body)
        .then((user) => {

            //Verifing if the token comes inside headers.authorization
            const authorization = req.headers.authorization

            if (!authorization) {
                throw new Error("nao autorizado");
            }

            //Spliting Bearer Token
            const token = authorization.split(' ')[1]
            //JWT
            const verifiedToken = jwt.verify(token, process.env.JWT_PASS ?? "")

            res.json({
                login: {
                    user,
                    verifiedToken
                }
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
    login,
    getProfile


}