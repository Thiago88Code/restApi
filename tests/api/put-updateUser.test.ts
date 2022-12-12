import { app } from "../../src/server/server"
import request from "supertest"

describe("userController.updatetUser()", () => {
    it("Should be able to update an user", async () => {
        const response = await request(app)
            .put("/api/v1/user")
            .send({
                id: 3,
                name: "Updated_NameTest",
                password: "Updated_NameTest",
                logged: 1
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('updateResponse')
        console.log(response.body)

    })

    it("Should NOT be able to update a empty user", async () => {
        const response = await request(app)
            .post("/api/v1/user")
            .send({
                id: 3,
                name: "",
                password: "",
                logged: 1
            })

        expect(response.status).toBe(400)
    })
})

