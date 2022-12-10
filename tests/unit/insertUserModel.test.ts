import { userModel } from "../../src/models/users"

describe("userModel.insertUser()", () => {

    it('should be able to create an user', async () => {
        const data: any = {
            id: 1,
            name: "NameTest",
            password: "PasswordTest",
            logged: 0
        }
        
        const user = await userModel.insertUser(data)
        expect(user)

    })
})
