// Módulo de Jorge: Listado de Compras con Búsqueda, Filtro por Categoría y Operaciones CRUD

/**
 * Componente PurchaseList
 * 
 * Despliega el historial completo de compras registradas en una tabla estructurada.
 * Proporciona controles interactivos para buscar transacciones por película o cliente,
 * filtrar por categoría de boleto (General, Preferencial, VIP) y delegar operaciones
 * de edición o eliminación en cada elemento.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.compras - Listado de compras registradas.
 * @param {Function} props.onEliminar - Callback para eliminar un registro por su ID.
 * @param {Function} props.onEditar - Callback para guardar los cambios editados en una compra.
 * @returns {JSX.Element} Elemento JSX que contiene el buscador, los filtros y la tabla de compras.
 */
function PurchaseList({ compras, onEliminar, onEditar }) {
    // Estados locales para el término de búsqueda y el filtro de categoría
    const [busqueda, setBusqueda] = React.useState("");
    const [tipoFiltro, setTipoFiltro] = React.useState("Todos");

    // Filtra las compras evaluando la coincidencia de texto y la categoría de boleto
    const comprasFiltradas = compras.filter((compra) => {
        const texto = busqueda.trim().toLowerCase();
        const coincideTexto =
            texto === "" ||
            compra.peliculaTitulo.toLowerCase().includes(texto) ||
            compra.nombre.toLowerCase().includes(texto) ||
            compra.apellido.toLowerCase().includes(texto);

        const coincideTipo = tipoFiltro === "Todos" || compra.tipoBoleto === tipoFiltro;

        return coincideTexto && coincideTipo;
    });

    return (
        <div>
            {/* Título de la sección del historial */}
            <h3 className="mb-3">Historial de compras</h3>

            {/* Barra de herramientas: Búsqueda por texto y selector de categoría */}
            <div className="row">
                <div className="col-md-8">
                    <SearchBar valor={busqueda} onCambiar={setBusqueda} />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="tipoFiltro">Categoría (tipo de boleto)</label>
                    <select
                        id="tipoFiltro"
                        className="form-select"
                        value={tipoFiltro}
                        onChange={(e) => setTipoFiltro(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="General">General</option>
                        <option value="Preferencial">Preferencial</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>
            </div>

            {/* Renderizado condicional: mensaje de alerta si no hay resultados o tabla con registros */}
            {comprasFiltradas.length === 0 ? (
                <div className="alert alert-info">No hay compras registradas con esos criterios.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Película</th>
                                <th>Función</th>
                                <th>Cliente</th>
                                <th>Tipo</th>
                                <th>Asientos</th>
                                <th>Total</th>
                                <th>Fecha de compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comprasFiltradas.map((compra) => (
                                <PurchaseItem
                                    key={compra.id}
                                    compra={compra}
                                    onEliminar={onEliminar}
                                    onEditar={onEditar}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

