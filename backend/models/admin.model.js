import pool from "../db/db.js"


export const findAdminByEmail=async (email)=>{
    const [rows]= await pool.execute(
        "SELECT * FROM admins WHERE email = ?",
        [email]
    );

    return rows[0];
}

export const createAdmin= async(email,password)=>{
    const [result]= await pool.execute(
        "INSERT INTO admins (email,password)VALUES (?,?)",
        [email,password]
    );


    return result;
}