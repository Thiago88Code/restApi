import { Application } from "express";
import { userRouter } from "./users";
import { Router } from "express";

export const useRoutes = (app:Application) =>{
    const apiRouter = Router()
    apiRouter.use('/user', userRouter)

    app.use('/api/v1', apiRouter)
}