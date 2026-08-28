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
 * @returns {JSX.Element} Selector de asientos y leyenda de estados.
 */
export default function SeatSelector({ ocupados, seleccionados, cantidad, onToggleAsiento }) {
    return (
        <div className="mb-3">
            {/* Progreso de selección */}
            <p className="fw-bold mb-2">
                Selecciona {cantidad} asiento(s) · {seleccionados.length}/{cantidad} elegidos
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
