import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import lineaRoutes from './routes/lineaRoutes.js';

dotenv.config();

const app = express();

// ---- HABILITAMOS LAS VARIABLES DE ENTORNO ---- //

const PORT = process.env.PORT || 5000;

// ---- CONEXIÓN BASE DE DATOS ---- //
conectarDB();

// ---- ARCHIVOS ESTÁTICOS Y ACTIVACIÓN DE LOS EJS ---- //
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ---- MIDDLEWARE PARA PROCESAR LOS DATOS DEL FORMULARIO ---- //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---- RUTAS PARA EL PROYECTO GANTT ---- //
app.use('/', lineaRoutes); // Asegúrate de incluir la barra ('/') para que las rutas funcionen correctamente

// ---- INICIO DEL SERVIDOR ---- //
app.listen(PORT, () => {
  console.log(`Servidor ok en puerto ${PORT}`);
});

