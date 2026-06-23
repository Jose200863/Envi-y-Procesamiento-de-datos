function Resultado({ datos }) {

    return (

        <div className="resultado">

            <h2>Resultado</h2>

            <p>
                <strong>Placa:</strong> {datos.placa}
            </p>

            <p>
                <strong>Tipo:</strong> {datos.tipo}
            </p>

            <p>
                <strong>Tarifa:</strong> ₡{datos.tarifa}
            </p>

            <p>
                <strong>Tiempo:</strong> {datos.tiempoUso}
            </p>

            <p>
                <strong>Horas cobradas:</strong> {datos.horasCobradas}
            </p>

            <p>
                <strong>Total:</strong> ₡{datos.total}
            </p>

        </div>

    );

}

export default Resultado;