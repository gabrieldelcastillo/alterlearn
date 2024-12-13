import PublicaCompra from "../models/cart.js";
import Recurso from "../models/recurso.js";
import fs from "fs";
import path from "path";

// Guarda el estado actual del carro de compras
export const guardarCarro = async (req, res) => {
  try {
    const { id_usuario, recursos, sesion } = req.body;
    const compraExistente = await cart.findOne({ id_usuario, sesion });

    if (compraExistente) {
      compraExistente.recursos = recursos;
      await compraExistente.save();
      return res.json({ message: "Carro actualizado", compra: compraExistente });
    }

    const nuevaCompra = new PublicaCompra({ id_usuario, recursos, sesion });
    await nuevaCompra.save();
    res.json({ message: "Carro guardado", compra: nuevaCompra });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el carro", error });
  }
};
export const comprarRecurso = async (req, res) => {
  try {
    const { id_usuario, sesion, tarjeta, fecha_expiracion, cvv } = req.body;

    const tarjetaRegex = /^\d{16}$/;
    const expiracionRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!tarjetaRegex.test(tarjeta)) {
      return res.status(400).json({ message: "El número de la tarjeta debe tener 16 dígitos" });
    }

    if (!expiracionRegex.test(fecha_expiracion)) {
      return res.status(400).json({ message: "La fecha de expiración debe estar en el formato MM/AA" });
    }

    if (!cvvRegex.test(cvv)) {
      return res.status(400).json({ message: "El CVV debe tener 3 dígitos" });
    }

    const compra = await cart.findOne({ id_usuario, sesion });
    if (!compra) {
      return res.status(404).json({ message: "No se encontró la compra" });
    }

    const recursos = await Recurso.find({ _id: { $in: compra.recursos } });
    const archivosZip = [];

    for (const recurso of recursos) {
      const filePath = path.join(__dirname, "..", recurso.archivo_pdf);
      if (fs.existsSync(filePath)) {
        archivosZip.push({
          nombre: path.basename(filePath),
          path: filePath
        });
      }
    }

    res.zip({
      files: archivosZip,
      filename: 'recursos.zip'
    });

    await PublicaCompra.deleteOne({ _id: compra._id });
  } catch (error) {
    res.status(500).json({ message: "Error al realizar la compra", error });
  }
};

// Elimina un recurso del carro de compras
export const eliminarRecurso = async (req, res) => {
  try {
    const { id_usuario, sesion, id_recurso } = req.body;
    const compra = await cart.findOne({ id_usuario, sesion });

    if (!compra) {
      return res.status(404).json({ message: "No se encontró la compra" });
    }

    compra.recursos = compra.recursos.filter(recursoId => recursoId.toString() !== id_recurso);
    await compra.save();
    res.json({ message: "Recurso eliminado del carro", compra });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el recurso", error });
  }
};

// Agrega un recurso al carro de compras
export const guardarRecurso = async (req, res) => {
  try {
    const { id_usuario, sesion, id_recurso } = req.body;
    const compra = await cart.findOne({ id_usuario, sesion });

    if (compra) {
      if (!compra.recursos.includes(id_recurso)) {
        compra.recursos.push(id_recurso);
        await compra.save();
      }
      return res.json({ message: "Recurso agregado al carro", compra });
    }

    const nuevaCompra = new PublicaCompra({ id_usuario, recursos: [id_recurso], sesion });
    await nuevaCompra.save();
    res.json({ message: "Recurso agregado al carro", compra: nuevaCompra });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el recurso", error });
  }
};
