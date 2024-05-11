import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(json())
app.use(cors())

import usuario from './src/routes/usuarios.js';
import cliente from './src/routes/clientes.js';
import producto from './src/routes/productos.js';
import venta from './src/routes/venta.js';
import detalleVenta from "./src/routes/detalleVenta.js";
import carrito from "./src/routes/carrito.js";


app.use('/api/usuarios',usuario)
app.use('/api/clientes',cliente)
app.use('/api/productos',producto)
app.use('/api/ventas',venta)
app.use('/api/detalleventas',detalleVenta)
app.use('/api/carrito',carrito)


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    connect('mongodb://127.0.0.1:27017/test')
        .then(() => console.log('Connected!')); 
});