import { app } from "../../src/server/server"
import request from "supertest"

it("Should be able to get a specific users", async () => {

    const response = await request(app)
        .get("/api/v1/user/1")

    expect(response.body).toHaveProperty('user')
    expect(response.status).toBe(200)
    console.log(response.body.user)
    

})
