import { Schema, model } from 'mongoose';

const dbCarrito = new Schema({
    producto: { type: Schema.Types.ObjectId, ref: 'producto' },
    cliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
    total: { type: Number, default: 0 }
}, { timestamps: true });


export default model("Carrito", dbCarrito);