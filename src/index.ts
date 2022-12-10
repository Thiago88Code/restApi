import {app} from "./server/server"

const PORT = process.env.PORT

app.listen(PORT, () =>
    console.log("Listening at " + PORT))

    