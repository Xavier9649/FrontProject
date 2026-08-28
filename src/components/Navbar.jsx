import React from "react";

// Barra de navegación superior

/**
 * Barra de navegación para alternar entre cartelera, historial y estadísticas.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.vistaActual - Identificador de la vista activa.
 * @param {Function} props.onCambiarVista - Actualiza la vista activa.
 * @returns {JSX.Element} Barra de navegación.
 */
export default function Navbar({ vistaActual, onCambiarVista }) {
    // Secciones disponibles
    const opciones = [
        { id: "cartelera", texto: "Cartelera" },
        { id: "historial", texto: "Historial" },
        { id: "estadisticas", texto: "Estadísticas" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                {/* Identidad de la aplicación */}
                <span className="navbar-brand fw-bold">
                    🎬 CENESTUR Cine
                </span>

                {/* Botones de navegación */}
                <div className="d-flex gap-2 flex-wrap">
                    {opciones.map((opcion) => (
                        <button
                            key={opcion.id}
                            type="button"
                            className={
                                "btn btn-sm " +
                                (vistaActual === opcion.id
                                     ? "btn-danger"
                                     : "btn-outline-light")
                            }
                            onClick={() => onCambiarVista(opcion.id)}
                        >
                            {opcion.texto}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
