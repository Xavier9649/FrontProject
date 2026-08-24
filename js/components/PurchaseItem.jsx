// Módulo de Jorge: Fila Individual del Historial con Modo de Edición y Eliminación

/**
 * Componente PurchaseItem
 * 
 * Representa una fila individual dentro de la tabla del historial de compras.
 * Permite visualizar el detalle completo de la transacción y alternar a un modo
 * de edición en línea para modificar los datos del cliente o la categoría del boleto,
 * además de gestionar la eliminación de la compra con confirmación previa.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.compra - Objeto con los datos de la compra individual.
 * @param {Function} props.onEliminar - Callback para eliminar la compra actual.
 * @param {Function} props.onEditar - Callback para aplicar las modificaciones realizadas a la compra.
 * @returns {JSX.Element} Elemento JSX que representa una fila (`<tr>`) en modo lectura o edición.
 */
function PurchaseItem({ compra, onEliminar, onEditar }) {
    // Estados locales para alternar el modo edición y almacenar los valores temporales de los campos
    const [editando, setEditando] = React.useState(false);
    const [nombre, setNombre] = React.useState(compra.nombre);
    const [apellido, setApellido] = React.useState(compra.apellido);
    const [tipoBoleto, setTipoBoleto] = React.useState(compra.tipoBoleto);

    /**
     * Valida y guarda las modificaciones realizadas en la compra.
     * Comprueba que los campos de texto no estén vacíos antes de notificar los cambios.
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
     * Cancela la edición y restablece los valores originales de la compra.
     */
    function cancelarEdicion() {
        setNombre(compra.nombre);
        setApellido(compra.apellido);
        setTipoBoleto(compra.tipoBoleto);
        setEditando(false);
    }

    /**
     * Solicita confirmación al usuario antes de eliminar el registro de compra.
     */
    function manejarEliminar() {
        const confirmado = window.confirm(
            "¿Eliminar la compra de " + compra.nombre + " " + compra.apellido + "?"
        );
        if (confirmado) {
            onEliminar(compra.id);
        }
    }

    // Renderizado en modo edición: muestra campos de entrada en la misma fila de la tabla
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

    // Renderizado en modo lectura: muestra los datos de la compra formateados con botones de acción
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

