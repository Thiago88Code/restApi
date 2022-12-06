import express from "express"
import bodyParser from "body-parser"
import { useRoutes } from "../routes/index"

const app = express()
app.use(bodyParser.json())
useRoutes(app)

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.status(401).json({ msg: "ok" })
    
})

export {app}
