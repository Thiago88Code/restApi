import { app } from "../../src/server/server"
import request from "supertest"

describe("userController.listUser()", () => {
    it("Should be able to list all users", async () => {
        const response = await request(app)
            .get("/api/v1/user")
         

        expect(response.status).toBe(200)
        
    })
})