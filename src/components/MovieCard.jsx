import React, { useState } from "react";
import { formatearFecha } from "../data/peliculas.js";

// Tarjeta de película y funciones disponibles

/**
 * Muestra la ficha de una película con póster, datos técnicos y horarios de funciones.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.pelicula - Datos de la película.
 * @param {Function} props.onSeleccionarFuncion - Inicia el flujo de compra para la función elegida.
 * @returns {JSX.Element} Tarjeta de película.
 */
export default function MovieCard({ pelicula, onSeleccionarFuncion }) {
    // Controla errores de carga en la imagen del póster
    const [errorImagen, setErrorImagen] = useState(false);

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm movie-card">
                {/* Póster con imagen remota o color de respaldo */}
                {!pelicula.posterUrl || errorImagen ? (
                    <div
                        className="movie-poster"
                        style={{ backgroundColor: pelicula.colorPoster }}
                    >
                        <span>{pelicula.titulo}</span>
                    </div>
                ) : (
                    <img
                        src={pelicula.posterUrl}
                        alt={"Póster de " + pelicula.titulo}
                        className="movie-poster-img"
                        onError={() => setErrorImagen(true)}
                    />
                )}

                {/* Datos técnicos y funciones */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{pelicula.titulo}</h5>

                    {/* Etiquetas de género, clasificación y duración */}
                    <p className="mb-1">
                        <span className="badge bg-secondary me-1">{pelicula.genero}</span>
                        <span className={"badge me-1 " + claseClasificacion}>{pelicula.clasificacion}</span>
                        <span className="badge bg-light text-dark">{pelicula.duracion} min</span>
                    </p>

                    {/* Horarios y salas disponibles */}
                    <p className="fw-bold mt-2 mb-1">Funciones disponibles:</p>
                    <div className="d-flex flex-wrap gap-2 mt-auto">
                        {pelicula.funciones.map((funcion) => (
                            <button
                                key={funcion.id}
                                type="button"
                                className="btn btn-outline-dark btn-sm text-start"
                                onClick={() => onSeleccionarFuncion(pelicula, funcion)}
                            >
                                <span className="d-block fw-bold" style={{ fontSize: "0.7rem" }}>
                                    {formatearFecha(funcion.fecha)}
                                </span>
                                {funcion.horario} · {funcion.sala}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
