// Módulo de Miguel: Resumen y Confirmación de Compra

/**
 * Componente PurchaseSummary
 * 
 * Muestra el resumen de confirmación tras registrar exitosamente una compra de boletos.
 * Presenta los datos clave de la transacción y ofrece opciones para descargar nuevamente
 * el boleto en formato PDF, volver a la cartelera o consultar el historial de compras.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.compra - Datos completos de la compra registrada.
 * @param {Function} props.onVolverCartelera - Función callback para regresar a la vista de cartelera.
 * @param {Function} props.onVerHistorial - Función callback para navegar al historial de compras.
 * @returns {JSX.Element} Elemento JSX que contiene la tarjeta de confirmación de compra.
 */
function PurchaseSummary({ compra, onVolverCartelera, onVerHistorial }) {
    return (
        <div className="card shadow-sm border-success">
            <div className="card-body">
                {/* Encabezado de éxito de la compra */}
                <h4 className="card-title text-success">¡Compra registrada!</h4>

                {/* Desglose de los detalles de la compra */}
                <p className="mb-1"><strong>Película:</strong> {compra.peliculaTitulo}</p>
                <p className="mb-1">
                    <strong>Función:</strong> {formatearFecha(compra.fechaFuncion)} · {compra.horario} · {compra.sala}
                </p>
                <p className="mb-1"><strong>Cliente:</strong> {compra.nombre} {compra.apellido}</p>
                <p className="mb-1"><strong>Tipo de boleto:</strong> {compra.tipoBoleto}</p>
                <p className="mb-1"><strong>Asientos:</strong> {compra.asientos.join(", ")}</p>
                <p className="mb-3"><strong>Total pagado:</strong> ${compra.total.toFixed(2)}</p>

                {/* Nota informativa sobre la descarga del archivo PDF */}
                <p className="text-muted small mb-3">
                    Tu boleto en PDF se descargó automáticamente. Si no fue así, puedes descargarlo de nuevo.
                </p>

                {/* Botones de acción para descarga y navegación */}
                <div className="d-flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => generarBoletoPDF(compra)}
                    >
                        Descargar boleto (PDF)
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onVolverCartelera}>
                        Volver a la cartelera
                    </button>
                    <button type="button" className="btn btn-outline-dark" onClick={onVerHistorial}>
                        Ver historial
                    </button>
                </div>
            </div>
        </div>
    );
}

