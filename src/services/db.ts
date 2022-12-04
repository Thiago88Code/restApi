import sqlite3 from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE;

if (!DATABASE_FILE)
    throw new Error("DATABASE_FILE not exists");

export const openConnection = () => {
    return new sqlite3.Database(DATABASE_FILE);
    
}

export const dbQuery = async (query: string, params: any[]) => {
    let db = openConnection();
    try {
        return await new Promise<any[]>((resolve, reject) => {
            db.all(query, params, (err: any, rows: any[]) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    } finally {
        db.close();
    }
}




