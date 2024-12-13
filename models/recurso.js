import mongoose from "mongoose";

const recursoSchema = new mongoose.Schema(
  {
    precio: { 
      type: Number, 
      required: true, 
    },
    profesor: { 
      type: String,
      required: true,
      maxlength: 40,
    },
    nombre_asignatura: {
      type: String,
      required: true,
      maxlength: 65,
    },
    fecha_creacion: {
      type: Date,
      default: Date.now, 
    },
    contenido: { //sub diviciones que puede tener una asignatura
      type: [String],
      required: true, 
      maxlength: 100, 
    },
    carrera: {
      type: String,
      required: true, 
      maxlength: 100, 
    },
    tipo_recurso: {
      type: String,
      required: true, 
      enum: ['CertamenSS', 'CertamenCS', 'Tarea', 'ControlSS', 'ControlCS', 'Apunte'],
    },
    archivo_pdf: {
      type: String, 
      required: true, 
      validate: {
        validator: function(v) {
          return v.endsWith(".pdf");
        },
        message: "El archivo debe ser un PDF"
      },   
    },
    anio: {
      type: Number, 
      required: true, 
      validate: {
        validator: function(v) {
          return /^\d{4}$/.test(v.toString()); // Asegura que sea un año de 4 dígitos
        },
        message: "El año debe ser un número de 4 dígitos"
      },
    },    
  },
  {
    timestamps: true, // Esto añade "createdAt" y "updatedAt" automáticamente
  }
);

export default mongoose.model("recurso", recursoSchema);
