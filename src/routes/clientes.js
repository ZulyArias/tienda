import httpClientes from "./../controllers/clientes.js"
import { Router } from "express"
import { check } from "express-validator"
import validarCampos from "./../middlewares/validarCampos.js"
import { validarJWT } from "../middlewares/validarJWT.js"
import clienteHelper from "./../helpers/clientesHelpers.js";


const router = Router();

// router.get()//listar todo
router.get("/listarTodosClientes", httpClientes.listarTodosClientes)
// get//listar por un id
router.get("/listarPorIdCliente/:id", [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id').custom(clienteHelper.existeClienteId),
    validarCampos
], httpClientes.listarPorIdCliente)
// listar activos, listar inactivos
router.get("/listarClienteActivo", httpClientes.listarClienteActivo)
router.get("/listarClienteInactivo", httpClientes.listarClienteInactivo)
// post//insertar
router.post("/insertarCliente", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    check('documento', 'El documento debe tener maximo 10 digitos').isLength({ max: 10 }),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono debe tener 8 digitos').isLength({ min: 10, max: 15 }),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    validarCampos,
    validarJWT
], httpClientes.insertarCliente)

// put//modificar
router.put("/modificarCliente/:id", [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    check('documento', 'El documento debe tener maximo 15 digitos').isLength({ max: 15 }),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono debe tener 8 digitos').isLength({ min: 10, max: 15 }),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    validarCampos,
    validarJWT
], httpClientes.modificarCliente)
// put//activar
router.put("/activarCliente/:id", [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id').custom(clienteHelper.existeClienteId),
    validarCampos,
    validarJWT
], httpClientes.activarCliente)
// put//desactivar
router.put("/desactivarCliente/:id", [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id').custom(clienteHelper.existeClienteId),
    validarCampos,
    validarJWT
], httpClientes.desactivarCliente)

export default router;