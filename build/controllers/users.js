"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_1 = require("../models/users");
const util_1 = require("../services/util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const insertUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    { //Empty field validation
        const user = req.body;
        if (!user)
            return (0, util_1.badrequest)(res, "invalid user");
        if (!user.name)
            return (0, util_1.badrequest)(res, "invalid name");
        if (!user.password)
            return (0, util_1.badrequest)(res, "invalid password");
    }
    //generating password hash
    let bcryptPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    let body = req.body;
    //assigning password hash to req.body
    body = {
        id: req.body.id,
        name: req.body.name,
        password: bcryptPassword,
        logged: req.body.logged
    };
    yield users_1.userModel.insertUser(body)
        .then((user) => {
        res.json({
            newUser: user
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
});
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_1.userModel.listUsers()
        .then((users) => {
        res.json({
            users
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
});
const getUser = (req, res) => {
    //Verifing if the id comes inside req.param
    const id = parseInt(req.params.id);
    users_1.userModel.getUser(id)
        .then((users) => {
        res.json({
            users
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
};
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    users_1.userModel.deleteUser(id)
        .then(() => {
        res.json({
            res: "User Deleted"
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
};
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Verifing if the id comes inside req.param
    //const id = parseInt(req.params.id);
    { //Empty field validation
        const user = req.body;
        if (!user)
            return (0, util_1.badrequest)(res, "invalid user");
        if (!user.name)
            return (0, util_1.badrequest)(res, "invalid name");
        if (!user.password)
            return (0, util_1.badrequest)(res, "invalid password");
    }
    //generating password hash
    let bcryptPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    let body = req.body;
    //assigning password hash to req.body
    body = {
        id: req.body.id,
        name: req.body.name,
        password: bcryptPassword,
        logged: req.body.logged
    };
    yield users_1.userModel.updateUser(body)
        .then((users) => {
        res.json({
            updateResponse: users
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    { //Empty field validation
        if (!req.body.name)
            return (0, util_1.badrequest)(res, "invalid user");
        if (!req.body.password)
            return (0, util_1.badrequest)(res, "invalid name");
    }
    //Calling the login function from model
    yield users_1.userModel.login(req.body)
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        //Verifing encripted password
        //CheckPass returns true or false
        const checkPass = yield bcrypt_1.default.compare(req.body.password, user.password);
        console.log(checkPass);
        if (!checkPass) {
            return (0, util_1.badrequest)(res, "invalid password");
        }
        //Generating token
        const token = jsonwebtoken_1.default.sign({ id: req.body.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : "", { expiresIn: '8h' });
        //Saving the token in the blacklist
        users_1.userModel.insertToken(req.body.id, token);
        res.json({
            user,
            token
        });
    }))
        .catch(err => (0, util_1.internalServerError)(res, err));
});
const logout = (req, res) => {
    const id = parseInt(req.params.id);
    //Deleting the token in the blacklist
    users_1.userModel.logout(id)
        .then(() => {
        res.json({
            res: "Deleted Token"
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
};
const getProfile = (req, res) => {
    //Calling the getProfile function from model
    users_1.userModel.getProfile(req.body)
        .then((user) => {
        var _a;
        //Verifing if the token comes inside headers.authorization
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new Error("nao autorizado");
        }
        //Spliting Bearer Token
        const token = authorization.split(' ')[1];
        //JWT
        const verifiedToken = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : "");
        res.json({
            login: {
                user
            }
        });
    })
        .catch(err => (0, util_1.internalServerError)(res, err));
};
exports.userController = {
    insertUser,
    listUsers,
    getUser,
    deleteUser,
    updateUser,
    login,
    logout,
    getProfile
};
