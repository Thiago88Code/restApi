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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const db_1 = require("../services/db");
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.dbQuery)('INSERT INTO users (name,password,logged) VALUES(?,?,?)', [user.name, user.password, user.logged]);
    const response = yield (0, db_1.dbQuery)(`SELECT * FROM users WHERE name = ? AND password = ?`, [user.name, user.password]);
    return response[0];
});
const insertToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_1.dbQuery)('INSERT INTO blacklist (userId,token) VALUES(?,?)', [userId, token]);
    return response[0];
});
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.dbQuery)('UPDATE users SET name = ?, password = ? WHERE id = ?', [user.name, user.password, user.id]);
    return getUser(user.id);
});
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_1.dbQuery)(`SELECT * FROM users`, []);
    return response;
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_1.dbQuery)(`SELECT * FROM users WHERE id = ?`, [id]);
    return response;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_1.dbQuery)(`DELETE FROM users WHERE id = ?`, [id]);
    return response;
});
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_1.dbQuery)(`SELECT * FROM users WHERE name = ? AND id = ?`, [user.name, user.id]);
    return response[0];
});
const logout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_1.dbQuery)(`DELETE FROM blacklist WHERE userId = ?`, [id]);
    return response;
});
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, db_1.dbQuery)(`SELECT * FROM blacklist WHERE userId = ?`, [user.id]);
    if (res.length < 1) {
        const notFound = ["Token not found"];
        return notFound;
    }
    else {
        const response = yield (0, db_1.dbQuery)(`SELECT * FROM users WHERE id = ?`, [user.id]);
        return response;
    }
});
exports.userModel = {
    insertUser,
    listUsers,
    getUser,
    deleteUser,
    updateUser,
    login,
    logout,
    getProfile,
    insertToken
};
