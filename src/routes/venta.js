import httpVenta from "./../controllers/venta.js"
import { Router } from "express"
import { check } from "express-validator"
import validarCampos from "./../middlewares/validarCampos.js"
import ventaHelpers from "./../helpers/ventasHelpers.js"
import clienteHelpers from "./../helpers/clientesHelpers.js"
import detalleVentaHelpers from "./../helpers/detalleVentaHelpers.js"
import { validarJWT } from "../middlewares/validarJWT.js"

const router = Router();

// const dbVenta = new Schema({
//     idCliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
//     idDetalleVenta: { type: Schema.Types.ObjectId, ref: 'detalleVenta' },
//     fecha: { type: Date, default: Date.now },
//     valorTotal: { type: Number, default: 0 },
//     cantidad: { type: Number, default: 0 },
//     descuento: { type: Number, default: 0 },
//     estado: { type: Number, default: 1 }
// }, { timestamps: true });


///ventas   ojo listar los detalles
// router.get()//listar todo
router.get("/listarTodasVentas", httpVenta.listarTodasVentas)
// get//listar por un id
router.get("/listarIdVenta/:id", [
    check('id', 'El idVenta es obligatorio').not().isEmpty(),
    check('id').custom(ventaHelpers.existeVentaId),
    validarCampos
], httpVenta.listarIdVenta)
//  listar activos, listar inactivos
router.get("/listarVentaActiva", httpVenta.listarVentaActiva)
//  listar ventas del cliente xxx
router.get("/listarVentaCliente/:id", [
    check('id', 'El idCliente es obligatorio').not().isEmpty(),
    check('id').custom(clienteHelpers.existeClienteId),
    validarCampos
], httpVenta.listarVentaCliente)
// listar todas las ventas entre dos fechas
router.get("/listarVentaFecha", [
    validarCampos
], httpVenta.listarVentaFecha)
//  listar ventas con un valor superior a xxxx
router.get("/listarVentaValor", [
    validarCampos
], httpVenta.listarVentaValor)
// total de ventas entre dos fechas
router.get("/listarTotalVentaFecha", [
    validarCampos
], httpVenta.listarTotalVentaFecha)
// total descuento
router.get("/listarTotalDescuento", httpVenta.listarTotalDescuento)
// post//insertar
router.post("/insertarVenta", [
    check('idCliente', 'El idCliente es obligatorio').not().isEmpty(),
    check('idDetalleVenta', 'El idDetalleVenta es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('valorTotal', 'El valorTotal es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('descuento', 'El descuento es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
], httpVenta.insertarVenta)
// put//modificar
router.put("/modificarVenta/:id", [
    check('id', 'El idVenta es obligatorio').not().isEmpty(),
    check('id').custom(ventaHelpers.existeVentaId),
    check('idCliente', 'El idCliente es obligatorio').not().isEmpty(),
    check('idCliente').custom(clienteHelpers.existeClienteId),
    check('idDetalleVenta', 'El idDetalleVenta es obligatorio').not().isEmpty(),
    check('idDetalleVenta').custom(detalleVentaHelpers.existeDetalleVentaId),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('valorTotal', 'El valorTotal es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('descuento', 'El descuento es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
], httpVenta.modificarVenta)
// put//activar
router.put("/activarVenta/:id", [
    check('id', 'El idVenta es obligatorio').not().isEmpty(),
    check('id').custom(ventaHelpers.existeVentaId),
    validarCampos,
    validarJWT
], httpVenta.activarVenta)
// put//desactivar
router.put("/desactivarVenta/:id", [
    check('id', 'El idVenta es obligatorio').not().isEmpty(),
    check('id').custom(ventaHelpers.existeVentaId),
    validarCampos,
    validarJWT
], httpVenta.desactivarVenta)

export default router;
