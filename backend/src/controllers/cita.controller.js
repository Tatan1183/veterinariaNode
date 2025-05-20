import Cita from "../models/cita.model.js";
import Mascota from "../models/mascota.model.js";
import Veterinario from "../models/veterinario.model.js";
import Servicio from "../models/servicio.model.js";

// Helper para transformar a formato DTO esperado por el frontend
const toCitaDTO = (cita) => {
  if (!cita) return null;
  const dto = cita.toObject();

  if (cita.mascota && typeof cita.mascota === "object") {
    dto.mascotaId = cita.mascota._id;
    dto.mascotaNombre = cita.mascota.nombre;
  } else {
    dto.mascotaId = cita.mascota;
  }

  if (cita.veterinario && typeof cita.veterinario === "object") {
    dto.veterinarioId = cita.veterinario._id;
    dto.veterinarioNombre = cita.veterinario.nombre;
    dto.veterinarioApellido = cita.veterinario.apellido;
  } else {
    dto.veterinarioId = cita.veterinario;
  }

  if (cita.servicio && typeof cita.servicio === "object") {
    dto.servicioId = cita.servicio._id;
    dto.servicioNombre = cita.servicio.nombre;
  } else {
    dto.servicioId = cita.servicio;
  }

  delete dto.mascota;
  delete dto.veterinario;
  delete dto.servicio;
  return dto;
};

//Mostrar citas
export const getCitas = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate("mascota", "nombre")
      .populate("veterinario", "nombre apellido")
      .populate("servicio", "nombre");
    res.json(citas.map(toCitaDTO));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Mostrar citas por ID
export const getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id)
      .populate("mascota", "nombre")
      .populate("veterinario", "nombre apellido")
      .populate("servicio", "nombre");
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(toCitaDTO(cita));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Crear citas
export const createCita = async (req, res) => {
  const { mascotaId, veterinarioId, servicioId, fechaHora, estado, notas } =
    req.body;
  try {
    // Validar existencia de las referencias
    const [mascota, veterinario, servicio] = await Promise.all([
      Mascota.findById(mascotaId),
      Veterinario.findById(veterinarioId),
      Servicio.findById(servicioId),
    ]);
    if (!mascota)
      return res.status(400).json({ message: "Mascota no encontrada." });
    if (!veterinario)
      return res.status(400).json({ message: "Veterinario no encontrado." });
    if (!servicio)
      return res.status(400).json({ message: "Servicio no encontrado." });

    const newCita = new Cita({
      mascota: mascotaId,
      veterinario: veterinarioId,
      servicio: servicioId,
      fechaHora,
      estado,
      notas,
    });
    let savedCita = await newCita.save();
    // Popula después de guardar para devolver el DTO completo
    savedCita = await Cita.findById(savedCita._id)
      .populate("mascota", "nombre")
      .populate("veterinario", "nombre apellido")
      .populate("servicio", "nombre");

    res.status(201).json(toCitaDTO(savedCita));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Actualizar Citas por ID
export const updateCita = async (req, res) => {
  const { mascotaId, veterinarioId, servicioId, ...updateData } = req.body;
  try {
    // Validar existencia de las referencias si se están cambiando
    if (mascotaId) {
      const mascota = await Mascota.findById(mascotaId);
      if (!mascota)
        return res.status(400).json({ message: "Mascota no encontrada." });
      updateData.mascota = mascotaId;
    }
    if (veterinarioId) {
      const veterinario = await Veterinario.findById(veterinarioId);
      if (!veterinario)
        return res.status(400).json({ message: "Veterinario no encontrado." });
      updateData.veterinario = veterinarioId;
    }
    if (servicioId) {
      const servicio = await Servicio.findById(servicioId);
      if (!servicio)
        return res.status(400).json({ message: "Servicio no encontrado." });
      updateData.servicio = servicioId;
    }

    let cita = await Cita.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    })
      .populate("mascota", "nombre")
      .populate("veterinario", "nombre apellido")
      .populate("servicio", "nombre");

    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(toCitaDTO(cita));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//EliminarCitas Por ID
export const deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
