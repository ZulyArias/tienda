import { Schema, model } from 'mongoose';

const dbDetalleVenta = new Schema({
    idCliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
    fecha: { type: Date, default: Date.now },
    valor: { type: Number, default: 0 },
}, { timestamps: true });

export default model("detalleVenta", dbDetalleVenta);