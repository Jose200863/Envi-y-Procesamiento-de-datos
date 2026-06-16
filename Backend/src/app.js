import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const NAME = process.env.SERVER_NAME;
const VERSION = process.env.SERVER_VERSION;
const DESCRIPTION = process.env.SERVER_DESCRIPTION;
const PORT = process.env.SERVER_PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/parqueo/calcular', (req, res) => {
   const {placa, tipo, horas, minutos} = req.body;

   if(!placa || placa.trim()=="") {
      res.status(400).json({error: 'La placa es requerida'});
   }

   if(!tipo || (tipo!=="carro" && tipo!=="moto")) {
    res.status(400).json({error: 'El tipo de vehiculo es requerido'})
   }

   if(Number.isNaN(horas) || horas < 0) {
    res.status(400).json({error: 'La cantidad de horas ingresadas no puede ser menor a 0 '})
   }

   if(Number.isNaN(minutos) || minutos < 0) {
    res.status(400).json({error: 'La cantidad de minutos ingresados no puede ser menor a 0'})
   }

   const tarifa=tipo=="carro"? 1200 : 500;

   let h=Number(horas);
   let m=Number(minutos);

   if (m>5) h++;

   const total=h*tarifa;

   res.json({
    placa:placa,
    tipo:tipo,
    tarifa:tarifa,
    tiempoUso:horas+":"+minutos,
    horasCobradas: h,
   });
});

app.get("/", (req, res) => {
  res.json({
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    puerto: PORT
  });
});

app.listen(PORT, () => {
  console.log(`${NAME} version ${VERSION} is running on http://localhost:${PORT}`);
});

