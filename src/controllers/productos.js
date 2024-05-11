import producto from "../models/productos.js"

const httpProductos = {
    listarTodosProductos: async (req, res) => {
        try {
            const result = await producto.find();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarPorIdProducto: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await producto.findById(id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarPorStockMinimo: async (req, res) => {
        // get//liste todos los productos por debajo stockminimo
        try {
            const result = await producto.find({ $expr: { $lt: ["$cantidad", "$stockminimo"] } });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarPorPrecio: async (req, res) => {
        // get//listar todos los articulos por encima del precio xxx
        try {
            const precio = req.params.precio;
            const result = await producto.find({ precio: { $gt: precio } });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarProductoActivo: async (req, res) => {
        try {
            const result = await producto.find({ estado: 1 });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarProductoInactivo: async (req, res) => {
        try {
            const result = await producto.find({ estado: 0 });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    insertarProducto: async (req, res) => {
        try {
            const { nombre, precio, cantidad, stockminimo } = req.body;
            const nuevoProducto = new producto({ nombre, precio, cantidad, stockminimo }); // Eliminar asignación de id
            await nuevoProducto.save();
            res.json({
                nuevoProducto,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    modificarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, precio, cantidad, stockminimo } = req.body;
            const result = await producto.findByIdAndUpdate(id, { nombre, precio, cantidad, stockminimo }, { new: true });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    activarProducto: async (req, res) => {
        try {
            const result = await producto.findByIdAndUpdate(req.params.id, { estado: 1 }, { new: true });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    desactivarProducto: async (req, res) => {
        try {
            const result = await producto.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default httpProductos;