// Componente Principal App: Integra los Módulos de Erick, Miguel y Jorge

/**
 * Componente App
 * 
 * Actúa como el contenedor y coordinador principal de toda la aplicación.
 * Integra los módulos desarrollados por el equipo:
 * - Módulo de Erick: Cartelera, filtrado por género, búsqueda y navegación.
 * - Módulo de Miguel: Formulario de compra, selección de asientos y generación de comprobante PDF.
 * - Módulo de Jorge: Historial de compras con operaciones CRUD y panel de estadísticas.
 * 
 * Gestiona el estado global de navegación, la persistencia en LocalStorage y distribuye
 * los datos y manejadores de eventos hacia cada uno de los componentes hijos.
 * 
 * @returns {JSX.Element} Elemento JSX que estructura la barra de navegación, la vista activa y el pie de página.
 */
function App() {
    // Estados principales de navegación y filtrado en cartelera
    const [vista, setVista] = React.useState("cartelera");
    const [generoFiltro, setGeneroFiltro] = React.useState("Todos");
    const [busquedaCartelera, setBusquedaCartelera] = React.useState("");
    const [seleccion, setSeleccion] = React.useState(null); // Objeto con la película y función seleccionada: { pelicula, funcion }
    const [ultimaCompra, setUltimaCompra] = React.useState(null);

    // Estado persistente del historial de compras con carga inicial desde LocalStorage
    const [compras, setCompras] = React.useState(() => {
        try {
            const guardado = localStorage.getItem("cineCompras");
            return guardado ? JSON.parse(guardado) : [];
        } catch (error) {
            console.error("No se pudo leer LocalStorage:", error);
            return [];
        }
    });

    // Sincroniza y guarda el historial de compras en LocalStorage ante cualquier modificación
    React.useEffect(() => {
        localStorage.setItem("cineCompras", JSON.stringify(compras));
    }, [compras]);

    // Actualiza dinámicamente el título de la pestaña del navegador según la sección activa
    React.useEffect(() => {
        const titulos = {
            cartelera: "Cartelera",
            compra: "Comprar boletos",
            historial: "Historial",
            estadisticas: "Estadísticas"
        };
        document.title = "CENESTUR Cine · " + (titulos[vista] || "");
    }, [vista]);

    // Extrae la lista de géneros únicos disponibles en el catálogo de películas
    const generos = [...new Set(PELICULAS.map((p) => p.genero))];

    // Aplica los filtros de género y término de búsqueda sobre el catálogo de películas
    const peliculasFiltradas = PELICULAS.filter((p) => {
        const coincideGenero = generoFiltro === "Todos" || p.genero === generoFiltro;
        const coincideBusqueda = p.titulo
            .toLowerCase()
            .includes(busquedaCartelera.trim().toLowerCase());
        return coincideGenero && coincideBusqueda;
    });

    /**
     * Prepara e inicia el flujo de compra para una película y función específicas.
     * 
     * @param {Object} pelicula - Datos de la película seleccionada.
     * @param {Object} funcion - Datos de la función seleccionada.
     */
    function manejarSeleccionFuncion(pelicula, funcion) {
        setSeleccion({ pelicula, funcion });
        setUltimaCompra(null);
        setVista("compra");
    }

    /**
     * Registra una nueva compra en el estado global, actualiza la última compra realizada
     * y genera automáticamente el boleto en formato PDF.
     * 
     * @param {Object} compra - Objeto con los datos detallados de la compra completada.
     */
    function manejarConfirmarCompra(compra) {
        setCompras((prev) => [...prev, compra]);
        setUltimaCompra(compra);
        generarBoletoPDF(compra);
    }

    /**
     * Elimina un registro de compra del historial a partir de su identificador.
     * 
     * @param {number|string} id - Identificador de la compra que se desea eliminar.
     */
    function manejarEliminarCompra(id) {
        setCompras((prev) => prev.filter((c) => c.id !== id));
    }

    /**
     * Aplica modificaciones sobre una compra existente en el historial,
     * recalculando el precio unitario y total si se modifica el tipo de boleto.
     * 
     * @param {number|string} id - Identificador de la compra a editar.
     * @param {Object} cambios - Objeto con los campos modificados (nombre, apellido, tipoBoleto).
     */
    function manejarEditarCompra(id, cambios) {
        setCompras((prev) =>
            prev.map((c) => {
                if (c.id !== id) return c;
                const precioUnitario = c.precioUnitario;
                const nuevoPrecioUnitario =
                    precioUnitario / MULTIPLICADOR_TIPO_BOLETO[c.tipoBoleto] *
                    MULTIPLICADOR_TIPO_BOLETO[cambios.tipoBoleto];
                return {
                    ...c,
                    ...cambios,
                    precioUnitario: nuevoPrecioUnitario,
                    total: nuevoPrecioUnitario * c.cantidad
                };
            })
        );
    }

    /**
     * Consulta y extrae la lista de asientos ya ocupados para una función determinada
     * a partir de todas las compras previamente registradas.
     * 
     * @param {number|string} funcionId - Identificador de la función a consultar.
     * @returns {Array<string>} Lista plana de identificadores de asientos ocupados.
     */
    function obtenerAsientosOcupados(funcionId) {
        return compras
            .filter((c) => c.funcionId === funcionId)
            .flatMap((c) => c.asientos);
    }

    return (
        <React.Fragment>
            {/* Barra de navegación superior (Módulo de Erick) */}
            <Navbar vistaActual={vista} onCambiarVista={setVista} />

            {/* Contenedor principal con vistas condicionales */}
            <main className="container py-4">
                {/* Vista 1: Cartelera de películas con búsqueda y filtros (Módulo de Erick) */}
                {vista === "cartelera" && (
                    <div>
                        <h2 className="mb-3">Cartelera</h2>
                        <SearchBar
                            id="busquedaCartelera"
                            label="Buscar película"
                            placeholder="Ej. Mutiny, Spa Weekend..."
                            valor={busquedaCartelera}
                            onCambiar={setBusquedaCartelera}
                        />
                        <FilterBar
                            generos={generos}
                            generoSeleccionado={generoFiltro}
                            onCambiarGenero={setGeneroFiltro}
                        />
                        <MovieList
                            peliculas={peliculasFiltradas}
                            onSeleccionarFuncion={manejarSeleccionFuncion}
                        />
                    </div>
                )}

                {/* Vista 2A: Formulario interactivo de compra de boletos (Módulo de Miguel) */}
                {vista === "compra" && seleccion && !ultimaCompra && (
                    <TicketForm
                        pelicula={seleccion.pelicula}
                        funcion={seleccion.funcion}
                        asientosOcupados={obtenerAsientosOcupados(seleccion.funcion.id)}
                        onConfirmarCompra={manejarConfirmarCompra}
                        onCancelar={() => setVista("cartelera")}
                    />
                )}

                {/* Vista 2B: Resumen de confirmación posterior a la compra (Módulo de Miguel) */}
                {vista === "compra" && ultimaCompra && (
                    <PurchaseSummary
                        compra={ultimaCompra}
                        onVolverCartelera={() => {
                            setUltimaCompra(null);
                            setSeleccion(null);
                            setVista("cartelera");
                        }}
                        onVerHistorial={() => {
                            setUltimaCompra(null);
                            setSeleccion(null);
                            setVista("historial");
                        }}
                    />
                )}

                {/* Vista 2C: Mensaje de advertencia si se accede a compra sin seleccionar función */}
                {vista === "compra" && !seleccion && (
                    <div className="alert alert-warning">
                        Primero elige una película y función desde la cartelera.
                    </div>
                )}

                {/* Vista 3: Historial y administración de compras (Módulo de Jorge) */}
                {vista === "historial" && (
                    <PurchaseList
                        compras={compras}
                        onEliminar={manejarEliminarCompra}
                        onEditar={manejarEditarCompra}
                    />
                )}

                {/* Vista 4: Panel analítico de estadísticas de ventas (Módulo de Jorge) */}
                {vista === "estadisticas" && <Statistics compras={compras} />}
            </main>

            {/* Pie de página institucional (Módulo de Erick) */}
            <Footer />
        </React.Fragment>
    );
}

