import httpCarrito from "./../controllers/carrito.js";
import { Router } from "express";
import { check } from "express-validator"
import validarCampos from "./../middlewares/validarCampos.js";
import { carritoHelper } from "../helpers/carritoHelpers.js";
import { validarJWT } from "../middlewares/validarJWT.js";


const router = Router();

router.get("/listarCarritoId/:id", [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(carritoHelper.existeCarritoIdValido),
    validarCampos
], httpCarrito.listarCarritoId);
router.post("/insertarCarrito", [
    check("producto", "El producto es obligatorio").not().isEmpty(),
    check("cliente", "El cliente es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("total", "El total debe ser un número").isNumeric(),
    validarCampos,
    validarJWT
], httpCarrito.insertarCarrito);
router.delete("/eliminarCarrito/:id", [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(carritoHelper.existeCarritoIdValido),
    validarCampos,
    validarJWT
], httpCarrito.eliminarCarrito);

export default router;