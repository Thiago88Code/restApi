
import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT


import  express from "express"
import bodyParser from "body-parser";
import { useRoutes } from "./routes/index";


const app = express()
app.use(bodyParser.json())
useRoutes(app)


app.get('/', (req, res) =>{
    res.json({msg: "ok"})

})
app.listen(PORT, () =>
console.log("servidor iniciado na porta" + PORT))

