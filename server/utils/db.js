import { createPool } from 'mysql2/promise';
import config from '../config/config.js';

export const pool = new createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// Middleware para manejar errores de conexión
pool.on("error", (err) => {
    console.error("Error en el pool de conexiones MySQL", err);
});

// Evento para manejar conexiones exitosas
pool.on("acquire", (connection) => {
    console.log(`Conexión ${connection.threadId} adquirida del pool`);
});