
import mongoose from 'mongoose';

const veterinarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    especialidad: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Omitimos password como solicitaste
    imagen: { type: String, trim: true, default: null }
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false
});

export default mongoose.model('Veterinario', veterinarioSchema);