import { useState } from "react";

function Formulario({ setResultado }) {

    const [placa, setPlaca] = useState("");
    const [tipo, setTipo] = useState("carro");
    const [horas, setHoras] = useState("");
    const [minutos, setMinutos] = useState("");

    const enviar = async (e) => {

        e.preventDefault();

        try {

            const respuesta = await fetch(
                "http://localhost:4000/api/parqueo/calcular",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        placa,
                        tipo,
                        horas: Number(horas),
                        minutos: Number(minutos)
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.error);
                return;
            }

            setResultado(datos);

        } catch (error) {

            alert("Error al conectar con el servidor");

        }

    };

    return (

        <form onSubmit={enviar}>

            <label>Placa</label>

            <input
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                required
            />

            <label>Tipo</label>

            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            >
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
            </select>

            <label>Horas</label>

            <input
                type="number"
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
                min="0"
                required
            />

            <label>Minutos</label>

            <input
                type="number"
                value={minutos}
                onChange={(e) => setMinutos(e.target.value)}
                min="0"
                max="59"
                required
            />

            <button type="submit">

                Calcular Cobro

            </button>

        </form>

    );

}

export default Formulario;