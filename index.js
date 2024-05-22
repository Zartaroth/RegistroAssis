const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const app = express();
const port = config.PORT;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT
});

// Conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Configuración del middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar las solicitudes POST desde el formulario de registro de asistencia
app.post('/registrar-asistencia', (req, res) => {
  const { dni } = req.body;

  // Verificar si el trabajador existe en la base de datos
  db.query('SELECT * FROM trabajadores WHERE dni = ?', [dni], (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length === 0) {
      return res.status(400).send('El trabajador no existe');
    }

    const trabajadorId = results[0].id;
    const fecha = new Date().toISOString().slice(0, 10);

    // Verificar si ya existe un registro de asistencia para este trabajador en la fecha actual
    db.query('SELECT * FROM asistencia WHERE trabajador_id = ? AND fecha = ?', [trabajadorId, fecha], (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length > 0) {
        return res.status(400).send('Ya existe un registro de asistencia para este trabajador hoy');
      }

      // Insertar el nuevo registro de asistencia
      db.query('INSERT INTO asistencia (trabajador_id, fecha, hora_entrada) VALUES (?, ?, ?)', [trabajadorId, fecha, new Date()], (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).send('Registro de asistencia exitoso');
      });
    });
  });
});

// Ruta para obtener todas las asistencias
app.get('/asistencias', (req, res) => {
  db.query('SELECT trabajadores.nombre, DATE_FORMAT(asistencia.fecha, "%d/%m/%Y") AS fecha, asistencia.hora_entrada FROM asistencia JOIN trabajadores ON asistencia.trabajador_id = trabajadores.id', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
