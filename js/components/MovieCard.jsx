// Módulo de Erick: Tarjeta de Presentación de Película y sus Funciones

/**
 * Componente MovieCard
 * 
 * Presenta la información individual de una película en la cartelera.
 * Incluye su póster promocional (con respaldo de color si la imagen no carga),
 * detalles de género, clasificación por edad, duración en minutos y los botones
 * interactivos de cada una de sus funciones programadas.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.pelicula - Datos de la película (título, póster, género, clasificación, funciones, etc.).
 * @param {Function} props.onSeleccionarFuncion - Callback que se ejecuta al seleccionar una función para iniciar la compra.
 * @returns {JSX.Element} Elemento JSX que contiene la tarjeta de la película.
 */
function MovieCard({ pelicula, onSeleccionarFuncion }) {
    // Estado local para controlar si la imagen remota del póster presenta un error de carga
    const [errorImagen, setErrorImagen] = React.useState(false);

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm movie-card">
                {/* Póster de la película: usa imagen remota o cuadro con color de respaldo */}
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

                {/* Cuerpo de la tarjeta con ficha técnica y funciones disponibles */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{pelicula.titulo}</h5>

                    {/* Insignias con metadatos de la película */}
                    <p className="mb-1">
                        <span className="badge bg-secondary me-1">{pelicula.genero}</span>
                        <span className="badge bg-info text-dark me-1">{pelicula.clasificacion}</span>
                        <span className="badge bg-light text-dark">{pelicula.duracion} min</span>
                    </p>

                    {/* Lista interactiva de horarios y salas de funciones */}
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

