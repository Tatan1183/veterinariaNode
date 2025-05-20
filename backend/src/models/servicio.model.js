import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, unique: true },
    descripcion: { type: String, trim: true },
    precio: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Servicio", servicioSchema);
