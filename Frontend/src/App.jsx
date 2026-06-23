import { useState } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import "./App.css";

function App() {

    const [resultado, setResultado] = useState(null);

    return (
        <div className="container">

            <h1>Sistema de Parqueo</h1>

            <Formulario setResultado={setResultado} />

            {resultado && <Resultado datos={resultado} />}

        </div>
    );

}

export default App;