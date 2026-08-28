import React from "react";
import MovieCard from "./MovieCard.jsx";

// Cuadrícula de películas filtradas

/**
 * Renderiza la cuadrícula de películas o una alerta si no hay coincidencias.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.peliculas - Lista de películas filtradas.
 * @param {Function} props.onSeleccionarFuncion - Inicia el flujo de compra de una función.
 * @returns {JSX.Element} Cuadrícula de películas o alerta informativa.
 */
export default function MovieList({ peliculas, onSeleccionarFuncion }) {
    // Mensaje si no hay resultados
    if (peliculas.length === 0) {
        return (
            <div className="alert alert-warning">
                No hay películas que coincidan con la búsqueda o el género seleccionado.
            </div>
        );
    }

    // Cuadrícula de películas
    return (
        <div className="row">
            {peliculas.map((pelicula) => (
                <MovieCard
                    key={pelicula.id}
                    pelicula={pelicula}
                    onSeleccionarFuncion={onSeleccionarFuncion}
                />
            ))}
        </div>
    );
}
