import { Router } from "express";
import { userController } from "../controllers/users";

const userRouter = Router()

userRouter.post('/', userController.insertUser);
userRouter.get('/', userController.listUsers);
userRouter.get('/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/', userController.updateUser);

userRouter.post('/login', userController.login);
userRouter.get('/login/profile', userController.getProfile);

export {
    userRouter,


}
