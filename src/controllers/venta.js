import venta from '../models/venta.js'

// const dbVenta = new Schema({
//     idCliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
//     idDetalleVenta: { type: Schema.Types.ObjectId, ref: 'detalleVenta' },
//     fecha: { type: Date, default: Date.now },
//     valorTotal: { type: Number, default: 0 },
//     cantidad: { type: Number, default: 0 },
//     descuento: { type: Number, default: 0 },
//     estado: { type: Number, default: 1 }
// }, { timestamps: true });

const httpVenta = {
    insertarVenta: async (req, res) => {
        try {
            const { idCliente, idDetalleVenta, fecha, valorTotal, cantidad, descuento } = req.body
            const ventaNueva = new venta({ idCliente, idDetalleVenta, fecha, valorTotal, cantidad, descuento })
            await ventaNueva.save()
            res.json({ ventaNueva })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    listarTodasVentas: async (req, res) => {
        try {
            const ventas = await venta.find()
            res.json({ ventas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarIdVenta: async (req, res) => {
        try {
            const { id } = req.params
            const ventaId = await venta.findById(id)
            res.json({ ventaId })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarVentaActiva: async (req, res) => {
        try {
            const ventasActivas = await venta.find({ estado: 1 })
            res.json({ ventasActivas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarVentaCliente: async (req, res) => {
        try {
            const { id } = req.params
            const ventasCliente = await venta.find({ idCliente: id })
            res.json({ ventasCliente })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarVentaFecha: async (req, res) => {
        try {
            const { fecha1, fecha2 } = req.body
            const ventasFecha = await venta.find({ fecha: { $gte: fecha1, $lte: fecha2 } })
            res.json({ ventasFecha })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarVentaValor: async (req, res) => {
        try {
            const { valor } = req.body
            const ventasValor = await venta.find({ valorTotal: { $gte: valor } })
            res.json({ ventasValor })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarTotalVentaFecha: async (req, res) => {
        try {
            let { fecha1, fecha2 } = req.body
            fecha1 = new Date(fecha1);
            fecha2 = new Date(fecha2);
            const totalVentaFecha = await venta.aggregate([
                {
                    $match: {
                        fecha: { $gte: fecha1, $lte: fecha2 }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$valorTotal" }
                    }
                }
            ])
            res.json({ totalVentaFecha })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarTotalDescuento: async (req, res) => {
        try {
            const totalDescuento = await venta.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$descuento" }
                    }
                }
            ])
            res.json({ totalDescuento })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    modificarVenta: async (req, res) => {
        try {
            const { id } = req.params
            const { idCliente, idDetalleVenta, fecha, valorTotal, cantidad, descuento } = req.body
            const ventaModificada = await venta.findByIdAndUpdate(id, { idCliente, idDetalleVenta, fecha, valorTotal, cantidad, descuento })
            res.json({ ventaModificada })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    activarVenta: async (req, res) => {
        try {
            const { id } = req.params
            const ventaActivada = await venta.findByIdAndUpdate(id, { estado: 1 }, { new: true })
            res.json({ ventaActivada })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    desactivarVenta: async (req, res) => {
        try {
            const { id } = req.params
            const ventaDesactivada = await venta.findByIdAndUpdate(id, { estado: 0 }, { new: true })
            res.json({ ventaDesactivada })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default httpVenta;