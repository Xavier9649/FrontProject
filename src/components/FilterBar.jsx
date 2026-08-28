import React from "react";
import { PELICULAS } from "../data/peliculas.js";

// Barra de filtros por género cinematográfico

/**
 * Muestra los botones de filtro por género con contador de películas disponibles.
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
            {/* Botón para restablecer y mostrar todos los géneros con total de películas */}
            <button
                type="button"
                className={
                    "btn btn-sm " +
                    (generoSeleccionado === "Todos" ? "btn-danger" : "btn-outline-danger")
                }
                onClick={() => onCambiarGenero("Todos")}
            >
                Todos ({PELICULAS.length})
            </button>

            {/* Botones por cada género disponible con su cantidad de películas */}
            {generos.map((genero) => {
                const cantidadPeliculas = PELICULAS.filter((p) => p.genero === genero).length;
                return (
                    <button
                        key={genero}
                        type="button"
                        className={
                            "btn btn-sm " +
                            (generoSeleccionado === genero ? "btn-danger" : "btn-outline-danger")
                        }
                        onClick={() => onCambiarGenero(genero)}
                    >
                        {genero} ({cantidadPeliculas})
                    </button>
                );
            })}
        </div>
    );
}
