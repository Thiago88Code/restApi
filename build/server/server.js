"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("../routes/index");
const app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.json());
(0, index_1.useRoutes)(app);
app.use(express_1.default.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.status(401).json({ msg: "ok" });
});
