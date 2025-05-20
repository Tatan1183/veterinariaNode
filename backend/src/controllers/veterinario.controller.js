import Veterinario from '../models/veterinario.model.js';

export const getVeterinarios = async (req, res) => {
    try {
        const veterinarios = await Veterinario.find();
        res.json(veterinarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVeterinarioById = async (req, res) => {
    try {
        const veterinario = await Veterinario.findById(req.params.id);
        if (!veterinario) return res.status(404).json({ message: 'Veterinario no encontrado' });
        res.json(veterinario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVeterinario = async (req, res) => {
    const { nombre, apellido, especialidad, email, password, imagen } = req.body;
    try {
        const newVeterinario = new Veterinario({ nombre, apellido, especialidad, email, password, imagen });
        const savedVeterinario = await newVeterinario.save();
        res.status(201).json(savedVeterinario);
    } catch (error) {
        if (error.code === 11000) { // Error de duplicado (email)
            return res.status(400).json({ message: "El email ya está registrado." });
        }
        res.status(400).json({ message: error.message });
    }
};

export const updateVeterinario = async (req, res) => {
    try {
        const veterinario = await Veterinario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!veterinario) return res.status(404).json({ message: 'Veterinario no encontrado' });
        res.json(veterinario);
    } catch (error) {
         if (error.code === 11000) {
            return res.status(400).json({ message: "El email ya está registrado por otro veterinario." });
        }
        res.status(400).json({ message: error.message });
    }
};

export const deleteVeterinario = async (req, res) => {
    try {
        const veterinario = await Veterinario.findByIdAndDelete(req.params.id);
        if (!veterinario) return res.status(404).json({ message: 'Veterinario no encontrado' });
        res.status(204).json(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};