import pool from "../db/db.js";

// Create Lead
export const createLead = async (leadData) => {
  const { name, email, budget, message } = leadData;

  const [result] = await pool.execute(
    `INSERT INTO leads (name, email, budget, message)
     VALUES (?, ?, ?, ?)`,
    [name, email, budget, message]
  );

  return result;
};

// Get All Leads
export const getAllLeads = async () => {
  const [rows] = await pool.execute(
    `SELECT * FROM leads
     ORDER BY created_at DESC`
  );

  return rows;
};

// Update Status
export const updateLeadStatus = async (id, status) => {
  const [result] = await pool.execute(
    `UPDATE leads
     SET status = ?
     WHERE id = ?`,
    [status, id]
  );

  return result;
};