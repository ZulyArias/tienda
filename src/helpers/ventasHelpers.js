import venta from "./../models/venta.js";

const ventaHelper = {
    existeVentaId: async (id, req) => {
        const existeVenta = await venta.findById(id);
        if (!existeVenta) {
            throw new Error(`El idVenta: ${id} no existe`);
        }
    }
}

export default ventaHelper;