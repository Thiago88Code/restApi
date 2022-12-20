import { app } from "../../src/server/server"
import request from "supertest"
import { User } from "../../src/models/users"
import puppeteer from "puppeteer"
import Ajv from "ajv";

let user: User

const ajv = new Ajv()

export let schema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
        password: { type: "string" }
    },
    required: ["name", "password"],
    additionalProperties: false
};

beforeAll(async () => {
    expect.assertions(2)

    //accessing the page and filling out the inputs through the puppeteer
    let puppeteerBody = {}
    let browser = await puppeteer.launch({
        headless: false,
        slowMo: 75
    })
    let page = await browser.newPage()
    await page.goto("https://eqsglobal.com/software-and-innovation/digital/")

    let name = await page.$eval('input[name=your-name]', (el: { value: string }) => el.value = 'beforeAllNameTest')
    expect(name).toBe('beforeAllNameTest')

    let password = await page.$eval('input[name=your-email]', (el: { value: string }) => el.value = 'beforeAllPasswordTest')
    expect(password).toBe('beforeAllPasswordTest')

    //creating the object with the data received from the inputs
    puppeteerBody = {
        name: name,
        password: password
    }

    //calling Supertest and testing the endpoint's post method
    const response = await request(app)
        .post("/api/v1/user")
        .send(puppeteerBody = {
            name: name,
            password: password
        })

    //validating the schema
    expect(ajv.validate(schema, puppeteerBody)).toBe(true);
    expect(response.status).toBe(201)

    //destructuring the data of type "User" that will be used for the put/post/delete methods
    user = { ...response.body.user }
})

it("Should be able to create a new User. Expect encripted password do not be equal 'PasswordTest' ", async () => {
    expect.assertions(9)

    let puppeteerBody = {}
    let browser = await puppeteer.launch()
    let page = await browser.newPage()
    await page.goto("https://eqsglobal.com/software-and-innovation/digital/")

    let name = await page.$eval('input[name=your-name]', (el: { value: string }) => el.value = 'NameTest')
    expect(name).toBe('NameTest')

    let password = await page.$eval('input[name=your-email]', (el: { value: string }) => el.value = 'PasswordTest')
    expect(password).toBe('PasswordTest')

    puppeteerBody = {
        name: name,
        password: password
    }

    const response = await request(app)
        .post("/api/v1/user")
        .send(puppeteerBody = {
            name: user.name,
            password: user.password
        })

    expect(response.status).toBe(201)
    expect(ajv.validate(schema, puppeteerBody)).toBe(true);
    expect(response.body.user.password).not.toBe('PasswordTest')
    console.log(response.body)

})

it("Should NOT be able to create an empty user", async () => {
    let puppeteerBody = {}

    expect.assertions(2)

    const response = await request(app)
        .post("/api/v1/user")
        .send(puppeteerBody = {
            name: "",
            password: ""
        })

    expect(ajv.validate(schema, puppeteerBody)).toBe(true);
    expect(response.status).toBe(400)
})

it("Should be able to list all users", async () => {
    expect.assertions(2)

    const response = await request(app)
        .get("/api/v1/user")

    expect(response.body.users.length).toBeGreaterThan(0)
    expect(response.status).toBe(200)

})

it("Should be able to get a specific User", async () => {
    expect.assertions(2)
    const response = await request(app)
        .get(`/api/v1/user/${user.id}`)

    expect(response.body).toHaveProperty('user')
    expect(response.status).toBe(200)
    console.log(response.body)

})

it("Should be able to update an user", async () => {
    expect.assertions(5)

    let puppeteerBody = {}
    let browser = await puppeteer.launch()
    let page = await browser.newPage()
    await page.goto("https://eqsglobal.com/software-and-innovation/digital/")

    let name = await page.$eval('input[name=your-name]', (el: { value: string }) => el.value = 'Updated_NameTest')
    expect(name).toBe('Updated_NameTest')

    let password = await page.$eval('input[name=your-email]', (el: { value: string }) => el.value = 'Updated_PasswordTest')
    expect(password).toBe('Updated_PasswordTest')

    puppeteerBody = {
        name: name,
        password: password
    }

    const response = await request(app)
        .put("/api/v1/user")
        .send(puppeteerBody = {
            id: user.id,
            name: name,
            password: password
        })

    expect(ajv.validate(schema, puppeteerBody)).toBe(true);
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('updateResponse')
    console.log(response.body)

})

it("Should NOT be able to update an empty user", async () => {
    
    let puppeteerBody = {}
    let browser = await puppeteer.launch()
    let page = await browser.newPage()
    await page.goto("https://eqsglobal.com/software-and-innovation/digital/")

    let name = await page.$eval('input[name=your-name]', (el: { value: string }) => el.value = '')
    expect(name).toBe('')

    let password = await page.$eval('input[name=your-email]', (el: { value: string }) => el.value = '')
    expect(password).toBe('')

    puppeteerBody = {
        name: name,
        password: password
    }
    const response = await request(app)
        .post("/api/v1/user")
        .send(puppeteerBody = {
            id: user.id,
            name: name,
            password: password
        })

    expect(ajv.validate(schema, puppeteerBody)).toBe(true);
    expect(response.status).toBe(400)
})

it("Should be able to delete an user", async () => {
    const response = await request(app)
        .delete(`/api/v1/user/${user.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('res')

})

