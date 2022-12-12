import { app } from "../../src/server/server"
import request from "supertest"
import { userModel } from "../../src/models/users"

it("Should be able to list all users", async () => {


    //Testing the endpoint
    const response = await request(app)
        .get("/api/v1/user")

    expect(response.body.users.length).toBeGreaterThan(0)
    expect(response.body).toHaveProperty('users')
    expect(response.status).toBe(200)
    console.log(response.body)
    
})


