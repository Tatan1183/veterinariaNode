import app from "./app.js";
import { connectDB } from "./db/database.js";

async function main() {
    try {
        await connectDB(); // Conectar a la base de datos
        app.listen(app.get("port"), () => {
            console.log(`API VetSys Pro corriendo en puerto ${app.get("port")}`);
            console.log(`Accede en http://localhost:${app.get("port")}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error);
    }
}
main();