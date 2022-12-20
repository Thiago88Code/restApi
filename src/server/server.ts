import dotenv from "dotenv"
dotenv.config();

import express from "express"
import bodyParser from "body-parser"
import { useRoutes } from "../routes/index"

const app = express()

//middlewares
app.use(bodyParser.json())
useRoutes(app)

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.json({ msg: "ok" })
})

export { app }
