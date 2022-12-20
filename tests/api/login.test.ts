import { app } from "../../src/server/server"
import request from "supertest"
import jwt from "jsonwebtoken"
import { CreateUser, User } from "../../src/models/users"

let user: User
let createUser: CreateUser
let token: string

beforeAll(async () => {
    const response = await request(app)
        .post("/api/v1/user")
        .send(createUser = {
            name: "loginNameTest",
            password: "loginPasswordTest"
        })

    user = { ...response.body.user }
})

it("Should be able to log in a user. Expect to receive a token then log in", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send(user = {
            "id": user.id,
            "name": user.name,
            "password": "loginPasswordTest"
        })

    token = response.body.token
    expect(response.status).toBe(200)
    expect(token.length).toBeGreaterThan(0)
    console.log(response.body.user)
    console.log(response.body.token)
})

it("Should NOT be able to log in with an empty user", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send(user = {
            "id": user.id,
            "name": "",
            "password": "loginPasswordTest"
        })

    expect(response.status).toBe(400)

})

it("Should NOT to be able to log in with wrong name", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send(user = {
            "id": user.id,
            "name": "wrong_name",
            "password": user.password
        })

    expect(response.status).toBe(500)

})

it("Should NOT to be able to log in with wrong password", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send(user = {
            "id": user.id,
            "name": user.name,
            "password": "wrong_password"
        })

    expect(response.status).toBe(500)

})


it("Should be able to get the User profile", async () => {

    const response = await request(app)
        .get("/api/v1/user/login/profile")
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_PASS ?? "", (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
            console.log(decoded)
            return;
        });
        expect(response.status).toBe(200)

    });

})


/*it("Should not be accessed a protected route without token", async () => {
   const response = await request(app)
   .get('/api/v1/user')
   expect(response.status).toBe(401)

})*/

it("Should be able to logout an user", async () => {
    const response = await request(app)
        .delete(`/api/v1/user/logout/${user.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('res')
    console.log(response.body)

})





