import { pool } from '../utils/db.js';

// Función para devolver tabla 
export const getUsersRequest = async () => {
    const [rows] = await pool.query('SELECT * FROM asistencia');
    return rows;
};


// Función para buscar un usuario por Doc Identidad
export const getUserByDNI = async (DNI) => {
    const [rows] = await pool.query('SELECT * FROM asistencia WHERE DocIdentidad = ?', [DNI]);
    return rows[0];
};

// Función para buscar un usuario por Doc Identidad
export const registerUserRequest = async (ticket, DNI) => {
    const [rows] = await pool.query('UPDATE asistencia SET Ticket = ? WHERE DocIdentidad = ?', [ticket, DNI]);
    return rows[0];
};