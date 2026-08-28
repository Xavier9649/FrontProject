import React from "react";

// Módulo de Erick: Barra de Navegación Principal de la App

/**
 * Componente Navbar
 * 
 * Despliega la barra superior fija de navegación de la aplicación web.
 * Contiene la identidad de la marca y los botones que permiten al usuario
 * alternar entre las vistas de Cartelera, Historial y Estadísticas.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.vistaActual - Identificador de la sección actualmente visible en la aplicación.
 * @param {Function} props.onCambiarVista - Callback para modificar la sección activa.
 * @returns {JSX.Element} Elemento JSX que contiene la barra de navegación superior.
 */
export default function Navbar({ vistaActual, onCambiarVista }) {
    // Definición de las secciones de navegación disponibles
    const opciones = [
        { id: "cartelera", texto: "Cartelera" },
        { id: "historial", texto: "Historial" },
        { id: "estadisticas", texto: "Estadísticas" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                {/* Identidad y logotipo de la aplicación */}
                <span className="navbar-brand fw-bold">
                    🎬 CENESTUR Cine
                </span>

                {/* Lista de botones de navegación con estilo condicional según la vista activa */}
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
