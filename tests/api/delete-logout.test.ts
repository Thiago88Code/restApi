
import { app } from "../../src/server/server"
import request from "supertest"

it("Should be able to logout an user", async () => {
    const response = await request(app)
        .delete("/api/v1/user/logout/1")
        
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('res')
    console.log(response.body)
    
})