import { dbQuery } from "../services/db"

export type User = {
    id: number
    name: string
    password: string
    logged: number

}

const insertUser = async (user: User) => {
    await dbQuery('INSERT INTO users (name,password,logged) VALUES(?,?,?)', [user.name, user.password, user.logged])
    const response = await dbQuery(`SELECT * FROM users WHERE name = ? AND password = ?`, [user.name, user.password])
    return response[0];

}

const insertToken = async (userId: number, token: string) => {
    const response = await dbQuery('INSERT INTO blacklist (userId, token) VALUES(?,?)', [userId, token])
    return response[0];

}


const updateUser = async (user: User) => {
    await dbQuery('UPDATE users SET name = ?, password = ? WHERE id = ?', [user.name, user.password, user.id])
    return getUser(user.id);

}

const listUsers = async () => {
    const response = await dbQuery(`SELECT * FROM users`, [])
    return response;

}

const getUser = async (id: number) => {
    const response = await dbQuery(`SELECT * FROM users WHERE id = ?`, [id])
    return response as User[];
}

const deleteUser = async (id: number) => {
    const response = await dbQuery(`DELETE FROM users WHERE id = ?`, [id])
    return response as User[];
}

const login = async (user: User) => {

    const response = await dbQuery(`SELECT * FROM users WHERE name = ? AND id = ?`, [user.name, user.id])
    return response[0];
}

const logout = async (id: number) => {
    const response = await dbQuery(`DELETE FROM blacklist WHERE userId = ?`, [id])
    return response as User[];
}

const getProfile = async (user: User) => {
    const res = await dbQuery(`SELECT * FROM blacklist WHERE userId = ?`, [user.id])
    if (res.length < 1) {
        const notFound: string[] = ["Token not found"]
        return notFound
    } else {
        const response = await dbQuery(`SELECT * FROM users WHERE id = ?`, [user.id])
        return response as User[];
    }

}

export const userModel = {
    insertUser,
    listUsers,
    getUser,
    deleteUser,
    updateUser,
    login,
    logout,
    getProfile,
    insertToken
}