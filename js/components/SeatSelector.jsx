// Módulo de Miguel: Selección de Asientos

/**
 * Componente SeatSelector
 * 
 * Permite al usuario seleccionar de forma visual e interactiva los asientos de la sala de cine.
 * Controla la disponibilidad de los asientos, previene la selección de asientos ocupados
 * y limita la cantidad de asientos elegibles según el número de boletos solicitado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<string>} props.ocupados - Lista de identificadores de asientos ya reservados en la función.
 * @param {Array<string>} props.seleccionados - Lista de identificadores de asientos seleccionados por el usuario.
 * @param {number} props.cantidad - Cantidad total de boletos que el usuario desea comprar.
 * @param {Function} props.onToggleAsiento - Función callback que se ejecuta al seleccionar o deseleccionar un asiento.
 * @returns {JSX.Element} Elemento JSX que contiene la cuadrícula de asientos y su leyenda explicativa.
 */
function SeatSelector({ ocupados, seleccionados, cantidad, onToggleAsiento }) {
    return (
        <div className="mb-3">
            {/* Indicador del progreso de selección de asientos */}
            <p className="fw-bold mb-2">
                Selecciona {cantidad} asiento(s) · {seleccionados.length}/{cantidad} elegidos
            </p>

            {/* Cuadrícula interactiva de asientos de la sala */}
            <div className="seat-grid mb-2">
                {MAPA_ASIENTOS.map((asiento) => {
                    // Determina el estado del asiento actual
                    const estaOcupado = ocupados.includes(asiento);
                    const estaSeleccionado = seleccionados.includes(asiento);

                    // Asigna las clases CSS correspondientes según el estado del asiento
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

            {/* Leyenda visual con la simbología de los estados de los asientos */}
            <div className="d-flex gap-3 small">
                <span><span className="seat-legend seat-libre"></span> Libre</span>
                <span><span className="seat-legend seat-seleccionado"></span> Seleccionado</span>
                <span><span className="seat-legend seat-ocupado"></span> Ocupado</span>
            </div>
        </div>
    );
}

