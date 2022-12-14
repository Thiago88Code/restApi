import { app } from "../../src/server/server"
import request from "supertest"
import { CreateUser, User } from "../../src/models/users"

let user: User

let createUser: CreateUser = {
    name: "NameTest",
    password: "PasswordTest"
}

beforeAll(async () => {

    let beforeAllCreateUser: CreateUser

    expect.assertions(1)

    const response = await request(app)
        .post("/api/v1/user")
        .send(beforeAllCreateUser = {
            name: "BeforeAll_NameTest",
            password: "BeforeAll_PasswordTest"
        })

    expect(response.status).toBe(201)
    user = { ...response.body.user }
})

it("Should be able to create a new User", async () => {
    expect.assertions(5)

    const response = await request(app)

        .post("/api/v1/user")
        .send(createUser)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('user.id')
    expect(response.body).toHaveProperty('user.name', "NameTest")
    expect(response.body).toHaveProperty('user.password')
    console.log(response.body)

})

it("Should NOT be able to create a empty user", async () => {
    //expect.assertions(2)

    const response = await request(app)
        .post("/api/v1/user")
        .send(createUser = {
            name: "",
            password: ""
        })
    expect(response.status).toBe(400)
})

it("Should be able to list all users", async () => {
    expect.assertions(2)

    //Testing the endpoint
    const response = await request(app)
        .get("/api/v1/user")

    expect(response.body.users.length).toBeGreaterThan(0)
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
            password: "Updated_NameTest"
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
            password: ""
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





