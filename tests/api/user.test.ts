import { app } from "../../src/server/server"
import request from "supertest"
import { escapeLeadingUnderscores } from "typescript"

let user: any

describe("/api/v1/user", () => {
    it("Should be able to create a new User", async () => {
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

        user = { ...response.body.user }
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

    it("Should be able to list all users", async () => {
        //Testing the endpoint
        const response = await request(app)
            .get("/api/v1/user")

        expect(response.body.users.length).toBeGreaterThan(0)
        expect(response.body).toHaveProperty('users')
        expect(response.status).toBe(200)
    })

    it("Should be able to get a specific User", async () => {

        const response = await request(app)
            .get(`/api/v1/user/${user.id}`)

        expect(response.body).toHaveProperty('user')
        expect(response.status).toBe(200)
        console.log(response.body)

    })

    it("Should be able to update an user", async () => {
        const response = await request(app)
            .put("/api/v1/user")
            .send({
                id: user.id,
                name: "Updated_NameTest",
                password: "Updated_NameTest",
                logged: user.logged
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('updateResponse')
        console.log(response.body)
        
    })

    it("Should NOT be able to update a empty user", async () => {
        const response = await request(app)
            .post("/api/v1/user")
            .send({
                id: user.id,
                name: "",
                password: "",
                logged: user.logged
            })

        expect(response.status).toBe(400)
    })

    it("Should be able to delete an user", async () => {
        const response = await request(app)
            .delete(`/api/v1/user/${user.id}`)
            
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('res')
        console.log(response.body)
        
    })
    
})



