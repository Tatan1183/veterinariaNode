import mongoose from 'mongoose';
import '../config.js'; //  cargar variables de entorno

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('>>> Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error.message);
        process.exit(1); // Salir si no se puede conectar
    }
};