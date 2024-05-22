const express = require('express');
const mysql = require('mysql2');
const config = require('./config');

const app = express();
const port = config.PORT;

// Configuración del pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware para manejar errores de conexión
pool.on('error', (err) => {
  console.error('Error en el pool de conexiones MySQL', err);
});

// Middleware para manejar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar las solicitudes POST desde el formulario de registro de asistencia
app.post('/registrar-asistencia', (req, res) => {
  const { dni } = req.body;

  // Obtener una conexión del pool
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }

    // Iniciar la transacción
    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        throw err;
      }

      // Verificar si el trabajador existe en la base de datos
      connection.query('SELECT * FROM trabajadores WHERE dni = ?', [dni], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            throw err;
          });
        }

        if (results.length === 0) {
          connection.rollback(() => {
            connection.release();
            res.status(400).send('El trabajador no existe');
          });
        } else {
          const trabajadorId = results[0].id;
          const fecha = new Date().toISOString().slice(0, 10);

          // Verificar si ya existe un registro de asistencia para este trabajador en la fecha actual
          connection.query('SELECT * FROM asistencia WHERE trabajador_id = ? AND fecha = ?', [trabajadorId, fecha], (err, results) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                throw err;
              });
            }

            if (results.length > 0) {
              connection.rollback(() => {
                connection.release();
                res.status(400).send('Ya existe un registro de asistencia para este trabajador hoy');
              });
            } else {
              // Insertar el nuevo registro de asistencia
              connection.query('INSERT INTO asistencia (trabajador_id, fecha, hora_entrada) VALUES (?, ?, ?)', [trabajadorId, fecha, new Date()], (err, results) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    throw err;
                  });
                }
                // Commit y liberar la conexión
                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      throw err;
                    });
                  }
                  connection.release();
                  res.status(200).send('Registro de asistencia exitoso');
                });
              });
            }
          });
        }
      });
    });
  });
});

// Ruta para obtener todas las asistencias
app.get('/asistencias', (req, res) => {
  pool.query('SELECT trabajadores.nombre, DATE_FORMAT(asistencia.fecha, "%d/%m/%Y") AS fecha, asistencia.hora_entrada FROM asistencia JOIN trabajadores ON asistencia.trabajador_id = trabajadores.id', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
