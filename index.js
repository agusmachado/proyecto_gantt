import dotenv from "dotenv";
dotenv.config();

import express from "express";
import conectarDB from "./config/db.js";
import lineaRoutes from "./routes/lineaRoutes.js";

const app = express();

// ---- CONEXIÓN BASE DE DATOS ---- //
conectarDB();

// ---- ARCHIVOS ESTÁTICOS Y ACTIVACIÓN DE LOS EJS ---- //
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ---- HABILITAMOS LAS VARIABLES DE ENTORNO ---- //
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/linea', lineaRoutes);

// ---- INICIO DEL SERVIDOR ---- //
try {
  app.listen(PORT, () => {
    console.log(`Servidor ok en puerto ${PORT}`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}
