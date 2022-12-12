import { app } from "../../src/server/server"
import request from "supertest"

it("Should be able to log in a user", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send({
            "id": 11,
            "name": "NameTest",
            "password": "PasswordTest",
            "logged": 1
        })

    expect(response.status).toBe(200)
    console.log(response.body.user)
    console.log(response.body.token)
    
    

})
it("Should NOT be able to log in with an empty user", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send({
            "id": 11,
            "name": "",
            "password": "",
            "logged": 1
        })

    expect(response.status).toBe(400)
    
    

})
