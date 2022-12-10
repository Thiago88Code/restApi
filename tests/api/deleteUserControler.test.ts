import { app } from "../../src/server/server"
import request from "supertest"

describe("userController.deleteUser()", () => {
    it("Should be able to delete an user", async () => {
        const response = await request(app)
            .delete("/api/v1/user/1")
            .send({
                res: "User Deleted"
            })
        expect(response.status).toBe(200)
    })
})