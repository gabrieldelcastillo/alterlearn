import mongoose from "mongoose";

const AsignaturaSchema = new mongoose.Schema(
  {
    nombre_asignatura: {
      type: String,
      required: true,
      unique: true,
      maxlength: 65,
    },
  },
  {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("Asignatura", AsignaturaSchema);