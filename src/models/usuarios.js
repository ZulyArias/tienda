import { Schema, model } from 'mongoose';

const dbUsuario = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: "", min: 8, max: 15 },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true })

export default model("usuario", dbUsuario)