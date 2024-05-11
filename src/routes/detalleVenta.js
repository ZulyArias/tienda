import httpDetalleVenta from "./../controllers/detalleVenta.js"
import { Router } from "express"
import { check } from "express-validator"
import validarCampos from "./../middlewares/validarCampos.js"
import { validarJWT } from "../middlewares/validarJWT.js"
import detalleVentaHelpers from "./../helpers/detalleVentaHelpers.js"

const router = Router();

// get//listar por un id venta
router.get("/listarIdDetalleVenta/:id", [
    check('id', 'El idVenta es obligatorio').not().isEmpty(),
    check('id').custom(detalleVentaHelpers.existeDetalleVentaId),
    validarCampos
], httpDetalleVenta.listarIdDetalleVenta)
// post//insertar
router.post("/insertarDetalleVenta", [
    check('idCliente', 'El idCliente es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT

], httpDetalleVenta.insertarDetalleVenta)
// put//modificar
router.put("/modificarDetalleVenta/:id", [
    check('id', 'El idVenta es obligatorio').not().isEmpty(),
    check('id').custom(detalleVentaHelpers.existeDetalleVentaId),
    check('idCliente', 'El idCliente es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    check('id').custom(detalleVentaHelpers.existeDetalleVentaId),
    check('valor', "El valor debe ser un número").isNumeric(),
    validarCampos,
    validarJWT
], httpDetalleVenta.modificarDetalleVenta)

export default router;