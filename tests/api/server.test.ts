import { app } from "../../src/server/server"
import supertest from "supertest"

const request = supertest(app)

it("must listen at http://localhost:3002", async () => {

    const response = await request
        .get("/")

    expect(response.status).toBe(200)
    
})
