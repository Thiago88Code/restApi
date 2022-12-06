import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT
import {app} from "./server/server"

app.listen(PORT, () =>
    console.log("Listening at " + PORT))

    