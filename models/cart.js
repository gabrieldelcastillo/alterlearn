import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", 
      required: true,
    },
    
    recursos: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "recurso", 
        required: true, 
      }
    ],
    
    fecha_compra: {
      type: Date,
      default: Date.now, 
    },
    
    sesion: {
      type: String, 
      required: true, // Se asegura que la sesión esté activa para realizar la compra
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("cart", cartSchema);
