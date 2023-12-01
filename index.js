import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import lineaRoutes from './routes/lineaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---- CONEXIÓN BASE DE DATOS ---- //
conectarDB();

// ---- ARCHIVOS ESTÁTICOS Y ACTIVACIÓN DE LOS EJS ---- //
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ---- HABILITAMOS LAS VARIABLES DE ENTORNO ---- //
app.use(express.json());

// ---- RUTAS PARA EL PROYECTO GANTT ---- //
app.use('/api', lineaRoutes);

// ---- INICIO DEL SERVIDOR ---- //
app.listen(PORT, () => {
  console.log(`Servidor ok en puerto ${PORT}`);
});

