import Mascota from '../models/mascota.model.js';
import Cliente from '../models/cliente.model.js'; // Para verificar existencia del cliente

// Helper para transformar a formato DTO esperado por el frontend
const toMascotaDTO = (mascota) => {
    if (!mascota) return null;
    const dto = mascota.toObject(); // Convierte el documento Mongoose a un objeto plano
    if (mascota.cliente && typeof mascota.cliente === 'object') {
        dto.clienteId = mascota.cliente._id;
        dto.clienteNombre = mascota.cliente.nombre;
        dto.clienteApellido = mascota.cliente.apellido;
    } else { // Si cliente es solo un ID (en creación/actualización antes de populate)
        dto.clienteId = mascota.cliente;
    }
    delete dto.cliente; // Remueve el objeto cliente anidado si existe
    return dto;
};


export const getMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.find().populate('cliente', 'nombre apellido'); // Popula nombre y apellido del cliente
        res.json(mascotas.map(toMascotaDTO));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMascotaById = async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id).populate('cliente', 'nombre apellido');
        if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada' });
        res.json(toMascotaDTO(mascota));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMascota = async (req, res) => {
    const { nombre, especie, raza, fechaNacimiento, imagen, clienteId } = req.body;
    try {
        // Verificar si el cliente existe
        const clienteExistente = await Cliente.findById(clienteId);
        if (!clienteExistente) {
            return res.status(400).json({ message: 'El cliente especificado no existe.' });
        }

        const newMascota = new Mascota({ nombre, especie, raza, fechaNacimiento, imagen, cliente: clienteId });
        let savedMascota = await newMascota.save();
        savedMascota = await Mascota.findById(savedMascota._id).populate('cliente', 'nombre apellido'); // Popula después de guardar
        res.status(201).json(toMascotaDTO(savedMascota));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMascota = async (req, res) => {
    const { clienteId, ...updateData } = req.body; // Separa clienteId si viene
    try {
        if (clienteId) {
            const clienteExistente = await Cliente.findById(clienteId);
            if (!clienteExistente) {
                return res.status(400).json({ message: 'El cliente especificado no existe.' });
            }
            updateData.cliente = clienteId; // Asegura que cliente se actualice
        }

        let mascota = await Mascota.findByIdAndUpdate(req.params.id, updateData, { new: true })
                                 .populate('cliente', 'nombre apellido');
        if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada' });
        res.json(toMascotaDTO(mascota));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteMascota = async (req, res) => {
    try {
        const mascota = await Mascota.findByIdAndDelete(req.params.id);
        if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};