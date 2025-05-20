import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
    }, // sparse permite nulls si no es required
    direccion: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Cliente", clienteSchema);
