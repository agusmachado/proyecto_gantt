import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"

const app = express()

// ---- HABILITAMOS LAS VARIABLES DE ENTORNO ---- //
dotenv.config()






// ---- CONEXIÓN BASE DE DATOS ---- //

conectarDB()
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Servidor ok en puerto ${PORT}`)
})