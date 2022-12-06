"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerError = exports.badrequest = void 0;
const badrequest = (res, err) => {
    res.status(400).json({
        err
    });
};
exports.badrequest = badrequest;
const internalServerError = (res, err) => {
    res.status(500).json({
        err: err.message
    });
};
exports.internalServerError = internalServerError;
