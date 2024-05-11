import detalleVenta from "../models/detalleVenta.js"

// const dbDetalleVenta = new Schema({
//     idCliente: { type:Schema.Types.ObjectId, ref: 'cliente'},
//     fecha: { type: Date, default: Date.now },
//     valor: { type: Number, default: 0 },
// }, { timestamps: true });

const httpDetalleVenta = {
    listarIdDetalleVenta: async (req, res) => {
        try {
            const result = await detalleVenta.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    insertarDetalleVenta: async (req, res) => {
        try {
            const { idCliente, fecha, valor } = req.body
            const detalleVentaNuevo = new detalleVenta({ idCliente, fecha, valor })
            await detalleVentaNuevo.save()
            res.json({ detalleVentaNuevo })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    modificarDetalleVenta: async (req, res) => {
        try {
            const { id } = req.params
            const { idCliente, fecha, valor } = req.body
            const detalleVentaModificado = await detalleVenta.findByIdAndUpdate(id, { idCliente, fecha, valor }, { new: true })
            res.json({ detalleVentaModificado })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default httpDetalleVenta;