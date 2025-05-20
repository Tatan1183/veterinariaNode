import Cliente from "../models/cliente.model.js";

//Mostrar Clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Mostrar Clientes Por ID
export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Crear Clientes
export const createCliente = async (req, res) => {
  const { nombre, apellido, telefono, email, direccion } = req.body;
  try {
    const newCliente = new Cliente({
      nombre,
      apellido,
      telefono,
      email,
      direccion,
    });
    const savedCliente = await newCliente.save();
    res.status(201).json(savedCliente);
  } catch (error) {
    if (error.code === 11000) {
      // Error de duplicado (email)
      return res.status(400).json({ message: "El email ya está registrado." });
    }
    res.status(400).json({ message: error.message });
  }
};

//Actualizar Cliente Por ID
export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "El email ya está registrado por otro cliente." });
    }
    res.status(400).json({ message: error.message });
  }
};

//EliminarCliente Por ID
export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    // Antes de eliminar, podrías verificar si tiene mascotas asociadas y decidir qué hacer
    // Por ahora, eliminación directa.
    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
