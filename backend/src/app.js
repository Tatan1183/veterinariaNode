import express from "express";
import cors from "cors";
import "./config.js"; // Carga variables de entorno

// Importar Rutas
import veterinarioRoutes from "./routes/veterinario.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import servicioRoutes from "./routes/servicio.routes.js";
import mascotaRoutes from "./routes/mascota.routes.js";
import citaRoutes from "./routes/cita.routes.js";

const app = express();

// Configuración del puerto
app.set("port", process.env.PORT || 5001);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("API VetSys Pro con Node.js, Express y MongoDB");
});

// Usar Rutas
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/citas", citaRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";
  res
    .status(statusCode)
    .json({
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

export default app;
