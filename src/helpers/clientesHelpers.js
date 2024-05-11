import clientes from "./../models/clientes.js";

const clienteHelper = {
    existeClienteId: async (id, req) => {
        const existe = await clientes.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }
        req.req.clientebd = existe
    }
}

export default clienteHelper;