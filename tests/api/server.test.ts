import { app } from "../../src/server/server"
import supertest from "supertest"

const request = supertest(app)

describe("", () => {
    it("", async () => {

        const response = await request.get("/")

        expect(response.status).toBe(200)
    })
})