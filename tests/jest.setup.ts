import supertest from "supertest"

import {app} from "../src/server/server"

export const testeServer = supertest(app)