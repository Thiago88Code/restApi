import { app } from "../../src/server/server"
import request from "supertest"
import jwt from "jsonwebtoken"

let user: any
let token: string

beforeAll(async () => {
    const response = await request(app)
        .post("/api/v1/user")
        .send({
            id: 1,
            name: "NameTest",
            password: "PasswordTest",
            logged: 1
        })

    user = { ...response.body.user }

})

it("Should be able to log in a user", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send({
            "id": user.id,
            "name": user.name,
            "password": "PasswordTest",
            "logged": user.logged
        })

    expect(response.status).toBe(200)
    console.log(response.body.user)
    console.log(response.body.token)
    token = response.body.token

})

it("Should NOT be able to log in with an empty user", async () => {

    const response = await request(app)
        .post("/api/v1/user/login")
        .send({
            "id": 1,
            "name": "",
            "password": "",
            "logged": 1
        })

    expect(response.status).toBe(400)

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

it("Should be able to logout an user", async () => {
    const response = await request(app)
        .delete(`/api/v1/user/logout/${user.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('res')
    console.log(response.body)


})





