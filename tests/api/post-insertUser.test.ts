import { app } from "../../src/server/server"
import request from "supertest"

describe("userController.insertUser()", () => {
    it("Should be able to create a new user", async () => {
        const response = await request(app)
            .post("/api/v1/user")
            .send({
                id: 1,
                name: "NameTest",
                password: "PasswordTest",
                logged: 1
            })
            

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('user')
        console.log(response.body)
    
    })

    it("Should NOT be able to create a empty user", async () => {
        const response = await request(app)
            .post("/api/v1/user")
            .send({
                id: 1,
                name: "",
                password: "",
                logged: 1
            })

        expect(response.status).toBe(400)
        
    })
})