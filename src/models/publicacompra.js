import mongoose from "mongoose";

const PublicaCompraSchema = new mongoose.Schema(
  {
    // La referencia a Usuario se puede hacer de esta forma, aunque dependerá de cómo tengas modelado al usuario en MongoDB
    id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Esta es la referencia al modelo 'Usuario', que no has detallado, pero asumo que lo tienes definido en otro archivo.
      required: true,
    },
    id_recurso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recurso", // Referencia al modelo 'Recurso'
      required: true,
    },
    fecha_compra: {
      type: Date,
      required: true,
    },
    fecha_publicacion: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Se agregarán createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("PublicaCompra", PublicaCompraSchema);