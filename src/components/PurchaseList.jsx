import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PurchaseItem from "./PurchaseItem.jsx";

// Historial de compras con búsqueda y filtrado por categoría

/**
 * Muestra la tabla del historial de compras con filtros de búsqueda y categoría.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.compras - Lista de compras registradas.
 * @param {Function} props.onEliminar - Elimina un registro por ID.
 * @param {Function} props.onEditar - Aplica cambios a una compra existente.
 * @returns {JSX.Element} Historial de compras.
 */
export default function PurchaseList({ compras, onEliminar, onEditar }) {
    // Estados de búsqueda y filtro de categoría
    const [busqueda, setBusqueda] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState("Todos");

    // Filtra las compras por texto y tipo de boleto
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
            {/* Título del historial */}
            <h3 className="mb-3">Historial de compras</h3>

            {/* Controles de búsqueda y filtro */}
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

            {/* Mensaje si no hay resultados o tabla con registros */}
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
