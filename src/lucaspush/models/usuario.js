import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },        // Campo para determinar si el usuario es administrador
    adminPassword: { type: String },                   // Contraseña única para admin
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Método para encriptar la contraseña
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Método para verificar la contraseña
UserSchema.methods.matchPassword = async function (password) {
  // Si es admin, verifica la adminPassword, de lo contrario, la contraseña normal
  if (this.isAdmin) {
    return await bcrypt.compare(password, this.adminPassword);
  }
  return await bcrypt.compare(password, this.password);
};

// Método para promover un usuario a administrador
UserSchema.methods.promoteToAdmin = async function (newAdminPassword) {
  // Asignamos al usuario como admin
  this.isAdmin = true;
  // Encriptamos y guardamos la contraseña de admin
  this.adminPassword = await bcrypt.hash(newAdminPassword, 10);
  return await this.save();
};

export default mongoose.model("Usuario", UserSchema);
