import detalleVenta from "./../models/detalleVenta.js";

const detalleVentaHelper = {
    existeDetalleVentaId: async (id, req) => {
        const existeDetalleVenta = await detalleVenta.findById(id);
        if (!existeDetalleVenta) {
            throw new Error(`El idDetalleVenta: ${id} no existe`);
        }
    }
}

export default detalleVentaHelper;