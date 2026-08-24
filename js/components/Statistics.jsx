// Módulo de Jorge: Panel de Estadísticas Calculadas a partir de las Compras Guardadas

/**
 * Componente Statistics
 * 
 * Calcula y presenta estadísticas globales del sistema de ventas en tiempo real,
 * tales como la cantidad total de transacciones realizadas, el volumen de boletos vendidos,
 * la recaudación monetaria acumulada y un ranking visual de las películas con mayor demanda.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.compras - Listado de todas las compras registradas en el sistema.
 * @returns {JSX.Element} Elemento JSX con las tarjetas informativas y gráficos de barras de progreso.
 */
function Statistics({ compras }) {
    // Si no existen compras en el historial, muestra un mensaje informativo
    if (compras.length === 0) {
        return (
            <div className="alert alert-info">
                Todavía no hay compras registradas para calcular estadísticas.
            </div>
        );
    }

    // Cálculo de métricas cuantitativas generales
    const totalCompras = compras.length;
    const totalBoletos = compras.reduce((suma, c) => suma + c.cantidad, 0);
    const recaudacion = compras.reduce((suma, c) => suma + c.total, 0);

    // Agrupación y conteo de boletos vendidos por cada película
    const conteoPorPelicula = {};
    compras.forEach((compra) => {
        const titulo = compra.peliculaTitulo;
        conteoPorPelicula[titulo] = (conteoPorPelicula[titulo] || 0) + compra.cantidad;
    });

    // Ordenamiento descendente del ranking de popularidad según la cantidad de boletos
    const ranking = Object.entries(conteoPorPelicula)
        .sort((a, b) => b[1] - a[1]);

    // Obtiene el valor máximo de boletos vendidos para calcular la proporción de la barra de progreso
    const maxBoletos = ranking.length > 0 ? ranking[0][1] : 0;

    return (
        <div>
            {/* Título de la sección de estadísticas */}
            <h3 className="mb-3">Estadísticas</h3>

            {/* Tarjetas de indicadores clave de rendimiento (KPIs) */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Total de compras</p>
                            <p className="fs-3 fw-bold mb-0">{totalCompras}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Boletos vendidos</p>
                            <p className="fs-3 fw-bold mb-0">{totalBoletos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Recaudación simulada</p>
                            <p className="fs-3 fw-bold mb-0">${recaudacion.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel con el ranking de películas más solicitadas y barras de progreso */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Películas más seleccionadas</h5>
                    {ranking.map(([titulo, cantidad]) => (
                        <div key={titulo} className="mb-2">
                            <div className="d-flex justify-content-between">
                                <span>{titulo}</span>
                                <span>{cantidad} boleto(s)</span>
                            </div>
                            <div className="progress" style={{ height: "8px" }}>
                                <div
                                    className="progress-bar bg-danger"
                                    style={{ width: (cantidad / maxBoletos) * 100 + "%" }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

