import Carrito from "../models/carrito.js"

const httpCarrito = {
    listarCarritoId: async (req, res) => {
        try{
            const { id } = req.params
            const carrito = await Carrito.findById(id)
            res.json(carrito)
        }catch(error){
            res.json({ error: error.message })
        }
    },
    insertarCarrito: async (req, res) => {
        try{
            const { producto, cliente, total} = req.body
            const nuevoCarrito = new Carrito({ producto, cliente, total });
            await nuevoCarrito.save();
            res.json(nuevoCarrito)
        }catch(error){
            res.json({ error: error.message })
        }
    },
    eliminarCarrito: async (req, res) => {
        try{
            const { id } = req.params
            await Carrito.findByIdAndDelete(id)
            res.json({ message: "Carrito eliminado" })
        }catch(error){
            res.json({ error: error.message })
        }
    }
}

export default httpCarrito