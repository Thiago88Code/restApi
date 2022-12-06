"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/', users_1.userController.insertUser);
userRouter.get('/', users_1.userController.listUsers);
userRouter.get('/:id', users_1.userController.getUser);
userRouter.delete('/:id', users_1.userController.deleteUser);
userRouter.put('/', users_1.userController.updateUser);
//Login routes
userRouter.post('/login', users_1.userController.login);
userRouter.delete('/logout/:id', users_1.userController.logout);
userRouter.get('/login/profile', users_1.userController.getProfile);
