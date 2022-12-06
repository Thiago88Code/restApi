"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = void 0;
const users_1 = require("./users");
const express_1 = require("express");
const useRoutes = (app) => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use('/user', users_1.userRouter);
    app.use('/api/v1', apiRouter);
};
exports.useRoutes = useRoutes;
