import React from "react";

// Módulo de Erick: Barra de Filtros de la Cartelera por Género

/**
 * Componente FilterBar
 * 
 * Despliega un conjunto de botones de acceso rápido para filtrar la cartelera
 * por categoría o género cinematográfico (por ejemplo, Acción, Comedia, Terror, etc.),
 * permitiendo además restablecer el filtro para visualizar todas las películas.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<string>} props.generos - Lista de nombres únicos de géneros disponibles en el catálogo.
 * @param {string} props.generoSeleccionado - Género actualmente activo en el filtro.
 * @param {Function} props.onCambiarGenero - Callback para actualizar el género seleccionado.
 * @returns {JSX.Element} Elemento JSX que contiene la botonera de filtrado por género.
 */
export default function FilterBar({ generos, generoSeleccionado, onCambiarGenero }) {
    return (
        <div className="d-flex flex-wrap gap-2 mb-4">
            {/* Botón para restablecer el filtro y mostrar todas las películas */}
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

            {/* Generación dinámica de botones para cada género disponible */}
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
