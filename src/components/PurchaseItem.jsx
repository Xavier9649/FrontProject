import React, { useState } from "react";
import { formatearFecha } from "../data/peliculas.js";

// Fila del historial de compras con edición y eliminación

/**
 * Fila individual del historial con visualización, edición en línea y eliminación.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.compra - Datos de la compra.
 * @param {Function} props.onEliminar - Elimina la compra.
 * @param {Function} props.onEditar - Guarda los cambios de la compra.
 * @returns {JSX.Element} Fila de tabla en modo lectura o edición.
 */
export default function PurchaseItem({ compra, onEliminar, onEditar }) {
    // Estados para modo de edición y campos temporales
    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState(compra.nombre);
    const [apellido, setApellido] = useState(compra.apellido);
    const [tipoBoleto, setTipoBoleto] = useState(compra.tipoBoleto);

    /**
     * Valida y emite las modificaciones de la compra.
     */
    function guardarCambios() {
        if (!nombre.trim() || !apellido.trim()) {
            alert("Nombre y apellido no pueden quedar vacíos.");
            return;
        }
        onEditar(compra.id, { nombre: nombre.trim(), apellido: apellido.trim(), tipoBoleto });
        setEditando(false);
    }

    /**
     * Cancela la edición y restaura los datos originales.
     */
    function cancelarEdicion() {
        setNombre(compra.nombre);
        setApellido(compra.apellido);
        setTipoBoleto(compra.tipoBoleto);
        setEditando(false);
    }

    /**
     * Solicita confirmación y ejecuta la eliminación del registro.
     */
    function manejarEliminar() {
        const confirmado = window.confirm(
            "¿Eliminar la compra de " + compra.nombre + " " + compra.apellido + "?"
        );
        if (confirmado) {
            onEliminar(compra.id);
        }
    }

    // Vista en modo edición
    if (editando) {
        return (
            <tr>
                <td colSpan="8">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                        <input
                            className="form-control form-control-sm"
                            style={{ maxWidth: "140px" }}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <input
                            className="form-control form-control-sm"
                            style={{ maxWidth: "140px" }}
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                        <select
                            className="form-select form-select-sm"
                            style={{ maxWidth: "150px" }}
                            value={tipoBoleto}
                            onChange={(e) => setTipoBoleto(e.target.value)}
                        >
                            <option value="General">General</option>
                            <option value="Preferencial">Preferencial</option>
                            <option value="VIP">VIP</option>
                        </select>
                        <button className="btn btn-sm btn-success" onClick={guardarCambios}>
                            Guardar
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    // Vista en modo lectura
    return (
        <tr>
            <td>{compra.peliculaTitulo}</td>
            <td>{formatearFecha(compra.fechaFuncion)} · {compra.horario} · {compra.sala}</td>
            <td>{compra.nombre} {compra.apellido}</td>
            <td><span className="badge bg-secondary">{compra.tipoBoleto}</span></td>
            <td>{compra.asientos.join(", ")}</td>
            <td>${compra.total.toFixed(2)}</td>
            <td>
                {new Date(compra.fecha).toLocaleString([], {
                    dateStyle: "short",
                    timeStyle: "short"
                })}
            </td>
            <td>
                <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-outline-dark" onClick={() => setEditando(true)}>
                        Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={manejarEliminar}>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
}
