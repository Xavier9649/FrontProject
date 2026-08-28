import React from "react";
import { formatearFecha } from "../data/peliculas.js";

// Módulo de Jorge: Panel de Estadísticas Calculadas a partir de las Compras Guardadas

/**
 * Componente Statistics
 * 
 * Calcula y presenta estadísticas globales del sistema de ventas en tiempo real,
 * tales como la cantidad total de transacciones realizadas, el volumen de boletos vendidos,
 * la recaudación monetaria acumulada, el ranking de películas y la distribución de boletos por sala y por día.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.compras - Listado de todas las compras registradas en el sistema.
 * @returns {JSX.Element} Elemento JSX con las tarjetas informativas y gráficos de barras de progreso.
 */
export default function Statistics({ compras }) {
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

    // Agrupación y conteo de boletos vendidos por sala
    const conteoPorSala = {};
    compras.forEach((compra) => {
        const sala = compra.sala || "Sin sala";
        conteoPorSala[sala] = (conteoPorSala[sala] || 0) + compra.cantidad;
    });
    const rankingSalas = Object.entries(conteoPorSala)
        .sort((a, b) => b[1] - a[1]);
    const maxBoletosSala = rankingSalas.length > 0 ? rankingSalas[0][1] : 0;

    // Agrupación y conteo de boletos vendidos por día/fecha de función
    const conteoPorFecha = {};
    compras.forEach((compra) => {
        const fecha = compra.fechaFuncion || "Sin fecha";
        conteoPorFecha[fecha] = (conteoPorFecha[fecha] || 0) + compra.cantidad;
    });
    const boletosPorFecha = Object.entries(conteoPorFecha)
        .sort((a, b) => a[0].localeCompare(b[0]));
    const maxBoletosFecha = boletosPorFecha.length > 0 ? Math.max(...boletosPorFecha.map(([, cant]) => cant)) : 0;

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

            {/* Panel con el ranking de películas y estadísticas por sala y por fecha */}
            <div className="row g-3">
                <div className="col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Películas más seleccionadas</h5>
                            {ranking.map(([titulo, cantidad]) => (
                                <div key={titulo} className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-semibold">{titulo}</span>
                                        <span className="badge bg-danger rounded-pill align-self-center">{cantidad} boleto(s)</span>
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

                <div className="col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Boletos por sala</h5>
                            {rankingSalas.map(([sala, cantidad]) => (
                                <div key={sala} className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-semibold">{sala}</span>
                                        <span className="badge bg-secondary rounded-pill align-self-center">{cantidad} boleto(s)</span>
                                    </div>
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div
                                            className="progress-bar bg-secondary"
                                            style={{ width: (cantidad / maxBoletosSala) * 100 + "%" }}
                                        ></div>
                                    </div>
                                </div>
                            ))}

                            <h5 className="card-title mb-3 mt-4">Boletos por fecha</h5>
                            {boletosPorFecha.map(([fecha, cantidad]) => (
                                <div key={fecha} className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-semibold">{typeof formatearFecha === "function" ? formatearFecha(fecha) : fecha}</span>
                                        <span className="badge bg-info text-dark rounded-pill align-self-center">{cantidad} boleto(s)</span>
                                    </div>
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div
                                            className="progress-bar bg-info"
                                            style={{ width: (cantidad / maxBoletosFecha) * 100 + "%" }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
