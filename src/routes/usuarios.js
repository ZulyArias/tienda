import httpUsuarios from "./../controllers/usuarios.js"
import { Router } from "express"
import { check } from "express-validator"
import validarCampos from "./../middlewares/validarCampos.js"
import { validarJWT } from "./../middlewares/validarJWT.js"
import { usuarioHelper } from "./../helpers/usuariosHelpers.js"

const router = Router();

// router.get()//listar todo
router.get("/listarTodosUsuarios", httpUsuarios.listarTodosUsuarios)
// get//listar por un id
router.get("/listarPorIdUsuario/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.listarPorIdUsuario)
// listar activos, 

router.get("/listarUsuarioActivo", httpUsuarios.listarUsuarioActivo)
//listar inactivos
router.get("/listarUsuarioInactivo", httpUsuarios.listarUsuarioInactivo)
// post//insertar
router.post("/insertarUsuario", [
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    check('email').custom(usuarioHelper.existeEmail),
    check('password', 'Password es muy corto').isLength({ min: 8 }),
    validarCampos
], httpUsuarios.insertarUsuario)
// post//login
router.post("/login", [
    check("email", "El documento es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], httpUsuarios.login)

// post //cambio contraseña
router.post("/cambioContrasena", [
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    check('password', 'Password es muy corto').isLength({ min: 8 }),
    check('password', 'Password es muy largo').isLength({ max: 15 }),
    validarCampos,
    validarJWT
], httpUsuarios.cambioContrasena)
// put//modificar
router.put("/modificarUsuario/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    check('email').custom(usuarioHelper.existeEmail),
    validarCampos,
    validarJWT
], httpUsuarios.modificarUsuario)
// put//activar
router.put("/activarUsuario/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos,
    validarJWT
], httpUsuarios.activarUsuario)
// put//desactivar
router.put("/desactivarUsuario/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos,
    validarJWT
], httpUsuarios.desactivarUsuario)

export default router;