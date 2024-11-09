import mongoose from "mongoose";

const RecursoSchema = new mongoose.Schema(
  {
    precio: {
      type: Number, // Tipo para precios, puede ser de tipo entero o flotante.
      required: false, // En el SQL no está como NOT NULL, así que lo dejamos opcional
    },
    control: {
      type: String,
      maxlength: 65,
    },
    certamen_con_sol: {
      type: String,
      maxlength: 65,
    },
    certamen_sin_sol: {
      type: String,
      maxlength: 65,
    },
    tarea: {
      type: String,
      maxlength: 65,
    },
    profesor: {
      type: String,
      maxlength: 40,
    },
    // Relación con Asignatura, usando ObjectId para referencia
    id_asignatura: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asignatura", // Esto indica que 'id_asignatura' es una referencia a un documento en la colección 'Asignatura'
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recurso", RecursoSchema);