import mongoose from "mongoose";

const mascotaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    especie: { type: String, required: true, trim: true },
    raza: { type: String, trim: true },
    fechaNacimiento: { type: Date },
    imagen: { type: String, trim: true, default: null },
    cliente: {
      // Referencia al cliente
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente", // Nombre del modelo Cliente
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Mascota", mascotaSchema);
