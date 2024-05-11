import { Schema, model } from 'mongoose';

const dbClientes = new Schema({
    nombre: { type: String, required: true },
    documento: { type: String, required: true, max: 15, unique: true },
    direccion: { type: String, required: true, max: 60 },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, min: 10, max: 15 },
    estado: { type: Number, required: true, default: 1 },
}, { timestamps: true })


export default model("cliente", dbClientes)