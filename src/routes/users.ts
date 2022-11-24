import { Router } from "express";
import { userController } from "../controllers/users";

const userRouter = Router()
userRouter.post('/', userController.insertUser);
userRouter.get('/', userController.listUsers);
userRouter.get('/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);
userRouter.get('/login', userController.getLogin);

export {
    userRouter
}
