import { Schema, model } from 'mongoose';

const dbProducto = new Schema({
    nombre: { type: String, required: true, max: 42, unique: true },
    precio: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    stockminimo: { type: Number, default: 0 },
    estado: { type: Number, required: true, default: 1 },
}, { timestamps: true })

export default model("producto", dbProducto)