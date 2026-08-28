import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FilterBar from "./components/FilterBar.jsx";
import MovieList from "./components/MovieList.jsx";
import TicketForm from "./components/TicketForm.jsx";
import PurchaseSummary from "./components/PurchaseSummary.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PurchaseList from "./components/PurchaseList.jsx";
import Statistics from "./components/Statistics.jsx";
import { PELICULAS, MULTIPLICADOR_TIPO_BOLETO } from "./data/peliculas.js";
import { generarBoletoPDF } from "./utils/pdfBoleto.js";

// Componente principal: coordina navegación, compras y estadísticas

/**
 * Coordina las vistas de cartelera, compra, historial y estadísticas.
 * Gestiona el estado global y la persistencia en LocalStorage.
 * 
 * @returns {JSX.Element} Aplicación principal.
 */
export default function App() {
    // Estados de navegación, filtros y selección
    const [vista, setVista] = useState("cartelera");
    const [generoFiltro, setGeneroFiltro] = useState("Todos");
    const [busquedaCartelera, setBusquedaCartelera] = useState("");
    const [seleccion, setSeleccion] = useState(null);
    const [ultimaCompra, setUltimaCompra] = useState(null);

    // Historial de compras con carga inicial desde LocalStorage
    const [compras, setCompras] = useState(() => {
        try {
            const guardado = localStorage.getItem("cineCompras");
            return guardado ? JSON.parse(guardado) : [];
        } catch (error) {
            console.error("No se pudo leer LocalStorage:", error);
            return [];
        }
    });

    // Guarda el historial en LocalStorage ante cada cambio
    useEffect(() => {
        localStorage.setItem("cineCompras", JSON.stringify(compras));
    }, [compras]);

    // Actualiza el título del documento según la vista activa
    useEffect(() => {
        const titulos = {
            cartelera: "Cartelera",
            compra: "Comprar boletos",
            historial: "Historial",
            estadisticas: "Estadísticas"
        };
        document.title = "CENESTUR Cine · " + (titulos[vista] || "");
    }, [vista]);

    // Obtiene géneros únicos del catálogo
    const generos = [...new Set(PELICULAS.map((p) => p.genero))];

    // Aplica filtros de género y búsqueda sobre la cartelera
    const peliculasFiltradas = PELICULAS.filter((p) => {
        const coincideGenero = generoFiltro === "Todos" || p.genero === generoFiltro;
        const coincideBusqueda = p.titulo
            .toLowerCase()
            .includes(busquedaCartelera.trim().toLowerCase());
        return coincideGenero && coincideBusqueda;
    });

    /**
     * Inicia el flujo de compra para la película y función seleccionadas.
     * 
     * @param {Object} pelicula - Película elegida.
     * @param {Object} funcion - Función elegida.
     */
    function manejarSeleccionFuncion(pelicula, funcion) {
        setSeleccion({ pelicula, funcion });
        setUltimaCompra(null);
        setVista("compra");
    }

    /**
     * Registra la compra completada y genera el comprobante PDF.
     * 
     * @param {Object} compra - Datos de la compra.
     */
    function manejarConfirmarCompra(compra) {
        setCompras((prev) => [...prev, compra]);
        setUltimaCompra(compra);
        generarBoletoPDF(compra);
    }

    /**
     * Elimina una compra del historial por su identificador.
     * 
     * @param {number|string} id - Identificador de la compra.
     */
    function manejarEliminarCompra(id) {
        setCompras((prev) => prev.filter((c) => c.id !== id));
    }

    /**
     * Modifica una compra existente y recalcula tarifas si cambia el tipo de boleto.
     * 
     * @param {number|string} id - Identificador de la compra.
     * @param {Object} cambios - Campos modificados.
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
     * Obtiene los asientos ocupados para una función específica.
     * 
     * @param {number|string} funcionId - Identificador de la función.
     * @returns {Array<string>} Lista de asientos ocupados.
     */
    function obtenerAsientosOcupados(funcionId) {
        return compras
            .filter((c) => c.funcionId === funcionId)
            .flatMap((c) => c.asientos);
    }

    return (
        <React.Fragment>
            {/* Barra de navegación superior */}
            <Navbar vistaActual={vista} onCambiarVista={setVista} />

            {/* Contenedor principal de vistas */}
            <main className="container py-4">
                {/* Vista: Cartelera */}
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

                {/* Vista: Formulario de compra */}
                {vista === "compra" && seleccion && !ultimaCompra && (
                    <TicketForm
                        pelicula={seleccion.pelicula}
                        funcion={seleccion.funcion}
                        asientosOcupados={obtenerAsientosOcupados(seleccion.funcion.id)}
                        onConfirmarCompra={manejarConfirmarCompra}
                        onCancelar={() => setVista("cartelera")}
                    />
                )}

                {/* Vista: Resumen de compra */}
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

                {/* Mensaje de selección requerida */}
                {vista === "compra" && !seleccion && (
                    <div className="alert alert-warning">
                        Primero elige una película y función desde la cartelera.
                    </div>
                )}

                {/* Vista: Historial de compras */}
                {vista === "historial" && (
                    <PurchaseList
                        compras={compras}
                        onEliminar={manejarEliminarCompra}
                        onEditar={manejarEditarCompra}
                    />
                )}

                {/* Vista: Estadísticas */}
                {vista === "estadisticas" && <Statistics compras={compras} />}
            </main>

            {/* Pie de página */}
            <Footer />
        </React.Fragment>
    );
}
