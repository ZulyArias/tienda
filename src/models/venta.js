import { Schema, model } from 'mongoose';

const dbVenta = new Schema({
    idCliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
    idDetalleVenta: { type: Schema.Types.ObjectId, ref: 'detalleVenta' },
    fecha: { type: Date, default: Date.now },
    valorTotal: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    estado: { type: Number, default: 1 }
}, { timestamps: true });

export default model("venta", dbVenta);