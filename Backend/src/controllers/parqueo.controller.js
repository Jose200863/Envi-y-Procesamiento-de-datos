export function calcularCobro(req, res) {
    const {placa, tipo, horas, minutos} = req.body;

   if(!placa || placa.trim()=="") {
       return res.status(400).json({error: 'La placa es requerida'});
   }

   if(!tipo || (tipo!=="carro" && tipo!=="moto")) {
       return res.status(400).json({error: 'El tipo de vehiculo es requerido'})
   }

   if(Number.isNaN(horas) || horas < 0) {
       return res.status(400).json({error: 'La cantidad de horas ingresadas no puede ser menor a 0 '})
   }

   if(Number.isNaN(minutos) || minutos < 0) {
       return res.status(400).json({error: 'La cantidad de minutos ingresados no puede ser menor a 0'})
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
    total:total
   });
}