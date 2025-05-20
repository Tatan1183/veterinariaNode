import Servicio from "../models/servicio.model.js";

//Mostrar servicios
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Mostrar servicio Por ID
export const getServicioById = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Crear servicio
export const createServicio = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    const newServicio = new Servicio({ nombre, descripcion, precio });
    const savedServicio = await newServicio.save();
    res.status(201).json(savedServicio);
  } catch (error) {
    if (error.code === 11000) {
      // Error de duplicado (nombre del servicio)
      return res
        .status(400)
        .json({ message: "Ya existe un servicio con ese nombre." });
    }
    res.status(400).json({ message: error.message });
  }
};

//Actualizar Servicio Por ID
export const updateServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(servicio);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Ya existe otro servicio con ese nombre." });
    }
    res.status(400).json({ message: error.message });
  }
};

//Eliminar Servicio por ID
export const deleteServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });
    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
