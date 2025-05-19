// importal framework express
import express from "express";

import cors from "cors";

//asignamos a app toda la funcionalidad para mi server web
const app = express();

//setear un puerto a mi web server
app.set("port",5000);

//Middleware
app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.send('RES API EN RENDER WITHOUT DATABASE ENDPOINTS')
})

//se pone disponible el server app para toda la app
export default app;
