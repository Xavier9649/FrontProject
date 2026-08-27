import React from "react";
import MovieCard from "./MovieCard.jsx";

// Módulo de Erick: Listado y Cuadrícula de Películas Filtradas

/**
 * Componente MovieList
 * 
 * Renderiza la colección de películas de la cartelera en una cuadrícula responsiva.
 * Si el conjunto de películas filtradas está vacío, muestra un mensaje de advertencia.
 * En caso contrario, genera una tarjeta MovieCard por cada película disponible.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.peliculas - Lista de películas que coinciden con los filtros aplicados.
 * @param {Function} props.onSeleccionarFuncion - Callback invocado al elegir una función específica.
 * @returns {JSX.Element} Elemento JSX que contiene la cuadrícula de películas o una alerta informativa.
 */
export default function MovieList({ peliculas, onSeleccionarFuncion }) {
    // Muestra una alerta informativa si no hay resultados que coincidan con la búsqueda o el género
    if (peliculas.length === 0) {
        return (
            <div className="alert alert-warning">
                No hay películas que coincidan con la búsqueda o el género seleccionado.
            </div>
        );
    }

    // Renderiza la cuadrícula de tarjetas de películas
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
