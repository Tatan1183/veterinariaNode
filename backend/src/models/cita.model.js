import mongoose from "mongoose";

const citaSchema = new mongoose.Schema(
  {
    fechaHora: { type: Date, required: true },
    estado: {
      type: String,
      required: true,
      trim: true,
      enum: ["Programada", "Confirmada", "Completada", "Cancelada"],
    },
    notas: { type: String, trim: true },
    mascota: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mascota",
      required: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
      required: true,
    },
    servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Cita", citaSchema);
