import { dbQuery } from "../services/db"

export type User = {
    id: number
    name: string
    password: string
    logged: number
    
}

const insertUser = async (user: User) =>{
   await dbQuery('INSERT INTO users (name,password,logged) VALUES(?,?,?)', [user.name, user.password, user.logged])
    const response = await dbQuery(`SELECT * FROM users WHERE id = ?`, [user.id])
    return response[0].id;
    
}


const updateUser = async (user: User) =>{
    await dbQuery('UPDATE users SET name = ?, password = ? WHERE id = ?', [user.name, user.password, user.id])
     return getUser(user.id);
     
}

const listUsers = async () =>{
    const response = await dbQuery(`SELECT * FROM users`, [])
    return response;
    
}

const getUser = async (id:number) => {
    const response = await dbQuery(`SELECT * FROM users WHERE id = ?`, [id])
    return response as User[];
}

const deleteUser = async (id:number) => {
    const response = await dbQuery(`DELETE FROM users WHERE id = ?`, [id])
    return response as User[];
}


const getLogin = async (user:User) => {
    const response = await dbQuery(`SELECT name FROM users WHERE name = ? AND password = ? AND id = ?`, [user.name, user.password, user.id])
    return response[0].id;

}


export const userModel = {
    insertUser,
    listUsers,
    getUser,
    deleteUser,
    updateUser,
    getLogin
}