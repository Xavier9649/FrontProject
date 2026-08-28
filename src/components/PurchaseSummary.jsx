import React from "react";
import { formatearFecha } from "../data/peliculas.js";
import { generarBoletoPDF } from "../utils/pdfBoleto.js";

// Resumen y confirmación de compra

/**
 * Presenta el resumen de una compra confirmada y opciones para descargar PDF o navegar.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.compra - Datos de la compra registrada.
 * @param {Function} props.onVolverCartelera - Regresa a la cartelera.
 * @param {Function} props.onVerHistorial - Navega al historial de compras.
 * @returns {JSX.Element} Tarjeta de confirmación.
 */
export default function PurchaseSummary({ compra, onVolverCartelera, onVerHistorial }) {
    return (
        <div className="card shadow-sm border-success">
            <div className="card-body">
                {/* Encabezado de confirmación */}
                <h4 className="card-title text-success">¡Compra registrada!</h4>

                {/* Detalle de la compra */}
                <p className="mb-1"><strong>Película:</strong> {compra.peliculaTitulo}</p>
                <p className="mb-1">
                    <strong>Función:</strong> {formatearFecha(compra.fechaFuncion)} · {compra.horario} · {compra.sala}
                </p>
                <p className="mb-1"><strong>Cliente:</strong> {compra.nombre} {compra.apellido}</p>
                <p className="mb-1"><strong>Tipo de boleto:</strong> {compra.tipoBoleto}</p>
                <p className="mb-1"><strong>Asientos:</strong> {compra.asientos.join(", ")}</p>
                <p className="mb-3"><strong>Total pagado:</strong> ${compra.total.toFixed(2)}</p>

                {/* Nota sobre descarga del boleto */}
                <p className="text-muted small mb-3">
                    Tu boleto en PDF se descargó automáticamente. Si no fue así, puedes descargarlo de nuevo.
                </p>

                {/* Acciones de navegación y descarga */}
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
