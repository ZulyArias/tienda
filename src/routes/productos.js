import httpProductos from "./../controllers/productos.js"
import { Router } from "express"
import { check } from "express-validator"
import validarCampos from "./../middlewares/validarCampos.js"
import { validarJWT } from "../middlewares/validarJWT.js"
import productosHelpers from "./../helpers/productosHelpers.js"

const router = Router();

// router.get()//listar todo
router.get("/listarTodosProductos", httpProductos.listarTodosProductos)
// get//listar por un id
router.get("/listarPorIdProducto/:id", [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(productosHelpers.existeProductoId),
    validarCampos
], httpProductos.listarPorIdProducto)
// get//liste todos los productos por debajo stockminimo
router.get("/listarPorStockMinimo", httpProductos.listarPorStockMinimo)
// get//listar todos los articulos por encima del precio xxx
router.get("/listarPorPrecio/:precio", httpProductos.listarPorPrecio)
// listar activos, 
router.get("/listarProductoActivo", httpProductos.listarProductoActivo)
// listar inactivos
router.get("/listarProductoInactivo", httpProductos.listarProductoInactivo)
// post//insertar
router.post("/insertarProducto", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es demasiado largo").isLength({ max: 42 }),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("precio", "El precio debe ser un número").isNumeric(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("cantidad", "La cantidad debe ser un número").isNumeric(),
    check("stockminimo", "El stockMinimo es obligatorio").not().isEmpty(),
    check("stockminimo", "El stockMinimo debe ser un número").isNumeric(),
    validarCampos,
    validarJWT
], httpProductos.insertarProducto)
// put//modificar
router.put("/modificarProducto/:id", [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(productosHelpers.existeProductoId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es demasiado largo").isLength({ max: 42 }),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("precio", "El precio debe ser un número").isNumeric(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("cantidad", "La cantidad debe ser un número").isNumeric(),
    check("stockminimo", "El stockMinimo es obligatorio").not().isEmpty(),
    check("stockminimo", "El stockMinimo debe ser un número").isNumeric(),
    validarCampos,
    validarJWT
], httpProductos.modificarProducto)
// put//activar
router.put("/activarProducto/:id", [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(productosHelpers.existeProductoId),
    validarCampos,
    validarJWT
], httpProductos.activarProducto)
// put//desactivar
router.put("/desactivarProducto/:id", [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(productosHelpers.existeProductoId),
    validarCampos,
    validarJWT
], httpProductos.desactivarProducto)

export default router;


