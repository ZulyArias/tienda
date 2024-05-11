import cliente from "../models/clientes.js"
const httpClientes = {
    listarTodosClientes: async (req, res) => {
        try {
            const clientes = await cliente.find()
            res.json({ clientes })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    listarPorIdCliente: async (req, res) => {
        try {
            const result = await cliente.findById(req.params.id)
            res.json({ result })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    listarClienteActivo: async (req, res) => {
        try {
            const clientes = await cliente.find({ estado: 1 })
            res.json({ clientes })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    listarClienteInactivo: async (req, res) => {
        try {
            const clientes = await cliente.find({ estado: 0 })
            res.json({ clientes })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    insertarCliente: async (req, res) => {
        try {
            const { nombre, documento, email, telefono, direccion, estado } = req.body
            const nuevoCliente = new cliente({ nombre, documento, email, telefono, direccion, estado })
            await nuevoCliente.save()
            res.json({ nuevoCliente })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    modificarCliente: async (req, res) => {
        try {
            const { id } = req.params
            const { nombre, documento, email, telefono, direccion, estado } = req.body
            const clienteM = await cliente.findByIdAndUpdate(id, { nombre, documento, email, telefono, direccion, estado })
            res.json({ clienteM })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    activarCliente: async (req, res) => {
        try {
            const { id } = req.params
            const clienteActivado = await cliente.findByIdAndUpdate(id, { estado: 1 })
            res.json({ clienteActivado })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    desactivarCliente: async (req, res) => {
        try {
            const { id } = req.params
            const clienteDesactivado = await cliente.findByIdAndUpdate(id, { estado: 0 })
            res.json({ clienteDesactivado })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default httpClientes;