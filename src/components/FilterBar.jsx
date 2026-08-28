import React from "react";

// Barra de filtros por género cinematográfico

/**
 * Muestra los botones de filtro por género cinematográfico.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<string>} props.generos - Lista de géneros disponibles.
 * @param {string} props.generoSeleccionado - Género activo.
 * @param {Function} props.onCambiarGenero - Actualiza el filtro de género.
 * @returns {JSX.Element} Botonera de filtros.
 */
export default function FilterBar({ generos, generoSeleccionado, onCambiarGenero }) {
    return (
        <div className="d-flex flex-wrap gap-2 mb-4">
            {/* Botón para restablecer y mostrar todos los géneros */}
            <button
                type="button"
                className={
                    "btn btn-sm " +
                    (generoSeleccionado === "Todos" ? "btn-danger" : "btn-outline-danger")
                }
                onClick={() => onCambiarGenero("Todos")}
            >
                Todos
            </button>

            {/* Botones por cada género disponible */}
            {generos.map((genero) => (
                <button
                    key={genero}
                    type="button"
                    className={
                        "btn btn-sm " +
                        (generoSeleccionado === genero ? "btn-danger" : "btn-outline-danger")
                    }
                    onClick={() => onCambiarGenero(genero)}
                >
                    {genero}
                </button>
            ))}
        </div>
    );
}
