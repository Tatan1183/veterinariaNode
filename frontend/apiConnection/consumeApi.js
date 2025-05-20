// URL base de tu API en Node.js
const BASE_API_URL = "http://localhost:5001/api"; // El puerto que configuraste

// --- VETERINARIOS ---
export const obtainVeterinarios = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/veterinarios`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const veterinarios = await response.json();
        return veterinarios;
    } catch (error) {
        console.error("Error al obtener veterinarios:", error);
        return [];
    }
};

// --- CLIENTES ---
export const obtainClientes = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/clientes`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        return [];
    }
};

// --- MASCOTAS ---
export const obtainMascotas = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/mascotas`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const mascotas = await response.json();
        // Recuerda que el backend ya debería estar devolviendo mascotas con datos del cliente poblados
        // en el formato esperado por tu frontend (ej. clienteNombre, clienteApellido)
        return mascotas;
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        return [];
    }
};

// --- SERVICIOS ---
export const obtainServicios = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/servicios`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const servicios = await response.json();
        return servicios;
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        // Podrías retornar un array vacío o null para que el que llama maneje el error
        return []; 
    }
};

// --- CITAS ---
export const obtainCitas = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/citas`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const citas = await response.json();
        // Similar a mascotas, el backend ya debería poblar los datos necesarios
        return citas;
    } catch (error) {
        console.error("Error al obtener citas:", error);
        return [];
    }
};