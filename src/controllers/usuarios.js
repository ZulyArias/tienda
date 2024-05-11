import usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "./../middlewares/validarJWT.js";

const httpUsuarios = {
  listarTodosUsuarios: async (req, res) => {
    try {
      const result = await usuario.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  listarPorIdUsuario: async (req, res) => {
    try {
      const result = await usuario.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  listarUsuarioActivo: async (req, res) => {
    try {
      const result = await usuario.find({ estado: 1 });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  listarUsuarioInactivo: async (req, res) => {
    try {
      const result = await usuario.find({ estado: 0 });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  insertarUsuario: async (req, res) => {
    try {
      const { email, password } = req.body;
      const nuevoUsuario = new usuario({ email, password });

      const salt = bcryptjs.genSaltSync();
      nuevoUsuario.password = bcryptjs.hashSync(password, salt);
      await nuevoUsuario.save();

      res.json({
        nuevoUsuario,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await usuario.findOne({ email });
      if (!result) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
      }

      const validPassword = bcryptjs.compareSync(password, result.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
      }

      if (result.estado === 0) {
        return res.status(400).json({ message: "Usuario inactivo" });
      }

      const tokenLog = await generarJWT(result._id);

      res.json({
        usuario: result,
        tokenLog,
        message: "Login correcto"
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },
  cambioContrasena: async (req, res) => {
    try {
      const { email, password, newPassword } = req.body;
      const result = await usuario.findOne({ email });
      if (result && bcryptjs.compareSync(password, result.password)) {
        const salt = bcryptjs.genSaltSync();
        result.password = bcryptjs.hashSync(newPassword, salt);
        await result.save();
        res.status(200).json({ message: "Contraseña actualizada" });
      } else {
        res.status(400).json({ message: "Usuario o contraseña incorrectos" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  modificarUsuario: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      const passwordEncriptada = bcryptjs.hashSync(password, salt);

      const result = await usuario.findByIdAndUpdate(
        req.params.id,
        { email, password: passwordEncriptada }, // Guardar la contraseña encriptada
        { new: true }
      );

      res.status(200).json(result);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  activarUsuario: async (req, res) => {
    try {
      const result = await usuario.findByIdAndUpdate(
        req.params.id,
        { estado: 1 },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  desactivarUsuario: async (req, res) => {
    try {
      const result = await usuario.findByIdAndUpdate(
        req.params.id,
        { estado: 0 },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default httpUsuarios;


// pepitoperez@gmail.com
// xxxLOLxxx