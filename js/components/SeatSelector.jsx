import React from "react";
import { MAPA_ASIENTOS } from "../data/peliculas.js";

// Selector interactivo de asientos

/**
 * Cuadrícula interactiva para la selección de asientos según disponibilidad y cantidad.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<string>} props.ocupados - Asientos no disponibles.
 * @param {Array<string>} props.seleccionados - Asientos elegidos por el usuario.
 * @param {number} props.cantidad - Límite de asientos a elegir.
 * @param {Function} props.onToggleAsiento - Alterna la selección de un asiento.
 * @param {Function} [props.onLimpiarSeleccion] - Deselecciona todos los asientos elegidos.
 * @returns {JSX.Element} Selector de asientos y leyenda de estados.
 */
export default function SeatSelector({ ocupados, seleccionados, cantidad, onToggleAsiento, onLimpiarSeleccion }) {
    const totalLibres = MAPA_ASIENTOS.length - ocupados.length;

    return (
        <div className="mb-3">
            {/* Progreso de selección e indicador de disponibilidad */}
            <div className="d-flex justify-content-between align-items-center mb-1">
                <p className="fw-bold mb-0">
                    Selecciona {cantidad} asiento(s) · {seleccionados.length}/{cantidad} elegidos
                </p>
                {seleccionados.length > 0 && onLimpiarSeleccion && (
                    <button
                        type="button"
                        className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                        onClick={onLimpiarSeleccion}
                    >
                        Limpiar selección
                    </button>
                )}
            </div>

            {/* Contador de asientos disponibles vs ocupados en tiempo real */}
            <p className="text-muted small mb-2">
                🟢 {totalLibres} disponibles · 🔴 {ocupados.length} ocupados
            </p>

            {/* Cuadrícula de asientos */}
            <div className="seat-grid mb-2">
                {MAPA_ASIENTOS.map((asiento) => {
                    // Determina el estado del asiento
                    const estaOcupado = ocupados.includes(asiento);
                    const estaSeleccionado = seleccionados.includes(asiento);

                    // Aplica estilos según disponibilidad
                    let clase = "seat";
                    if (estaOcupado) clase += " seat-ocupado";
                    else if (estaSeleccionado) clase += " seat-seleccionado";
                    else clase += " seat-libre";

                    return (
                        <button
                            type="button"
                            key={asiento}
                            className={clase}
                            disabled={estaOcupado}
                            onClick={() => onToggleAsiento(asiento)}
                        >
                            {asiento}
                        </button>
                    );
                })}
            </div>

            {/* Leyenda de estados */}
            <div className="d-flex gap-3 small">
                <span><span className="seat-legend seat-libre"></span> Libre</span>
                <span><span className="seat-legend seat-seleccionado"></span> Seleccionado</span>
                <span><span className="seat-legend seat-ocupado"></span> Ocupado</span>
            </div>
        </div>
    );
}
