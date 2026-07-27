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

export const saveRefreshToken = async (adminId, refreshToken) => {
  await pool.execute(
    "UPDATE users SET refresh_token = ? WHERE id = ?",
    [refreshToken, adminId]
  );
};

export const getRefreshToken = async (adminId) => {
  const [rows] = await pool.execute(
    "SELECT refresh_token FROM users WHERE id = ?",
    [adminId]
  );

  return rows[0]?.refresh_token;
};

export const removeRefreshToken = async (adminId) => {
  await pool.execute(
    "UPDATE users SET refresh_token = NULL WHERE id = ?",
    [adminId]
  );
};