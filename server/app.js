import express from 'express';

import cors from "cors";
import config from './config/config.js';

import asistencia from "./routes/asistencia.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', asistencia);

app.listen(config.PORT_SERV);
console.log(`Server is running on port ${config.PORT_SERV}.`); 