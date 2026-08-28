// Módulo de Miguel: Formulario de Compra, Selección de Asientos y Validación

/**
 * Componente TicketForm
 * 
 * Gestiona el formulario principal de compra de boletos para la función seleccionada.
 * Permite al usuario ingresar sus datos personales, seleccionar la cantidad y tipo de boleto,
 * elegir los asientos disponibles mediante el componente SeatSelector y validar la información
 * antes de registrar la transacción.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.pelicula - Información de la película seleccionada (título, póster, etc.).
 * @param {Object} props.funcion - Datos de la función elegida (fecha, horario, sala, precio base).
 * @param {Array<string>} props.asientosOcupados - Asientos no disponibles para la función actual.
 * @param {Function} props.onConfirmarCompra - Callback que recibe el objeto de la compra confirmada.
 * @param {Function} props.onCancelar - Callback para cancelar el proceso y regresar a la cartelera.
 * @returns {JSX.Element} Elemento JSX que contiene la tarjeta con el formulario de compra.
 */
function TicketForm({ pelicula, funcion, asientosOcupados, onConfirmarCompra, onCancelar }) {
    // Estados locales para el control del formulario y la selección del usuario
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [cantidad, setCantidad] = React.useState(1);
    const [tipoBoleto, setTipoBoleto] = React.useState("General");
    const [asientosSeleccionados, setAsientosSeleccionados] = React.useState([]);
    const [errores, setErrores] = React.useState({});

    // Sincroniza la lista de asientos seleccionados cuando el usuario reduce la cantidad de boletos
    React.useEffect(() => {
        setAsientosSeleccionados((prev) => prev.slice(0, cantidad));
    }, [cantidad]);

    /**
     * Alterna la selección de un asiento.
     * Si el asiento ya está seleccionado, lo retira de la lista;
     * si no lo está y aún no se ha alcanzado la cantidad solicitada, lo añade.
     * 
     * @param {string} asiento - Identificador del asiento (ej. "A1").
     */
    function alternarAsiento(asiento) {
        setAsientosSeleccionados((prev) => {
            if (prev.includes(asiento)) {
                return prev.filter((a) => a !== asiento);
            }
            if (prev.length >= cantidad) {
                return prev;
            }
            return [...prev, asiento];
        });
    }

    /**
     * Valida los datos ingresados en el formulario antes de procesar la compra.
     * Comprueba campos obligatorios, rango permitido de boletos y coincidencia de asientos.
     * 
     * @returns {boolean} Retorna true si todos los campos son válidos; de lo contrario, false.
     */
    function validarFormulario() {
        const nuevosErrores = {};

        if (!nombre.trim()) {
            nuevosErrores.nombre = "Por favor completa el campo de nombre.";
        }
        if (!apellido.trim()) {
            nuevosErrores.apellido = "Por favor completa el campo de apellido.";
        }
        if (cantidad < 1 || cantidad > 6) {
            nuevosErrores.cantidad = "La cantidad de boletos debe estar entre 1 y 6.";
        }
        if (asientosSeleccionados.length !== cantidad) {
            nuevosErrores.asientos = "Selecciona exactamente " + cantidad + " asiento(s).";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }

    /**
     * Procesa el envío del formulario de compra.
     * Ejecuta la validación, calcula el precio unitario y total según el tipo de boleto,
     * construye el objeto de compra estructurado e invoca la función de confirmación.
     * 
     * @param {Event} evento - Evento de envío del formulario.
     */
    function manejarEnvio(evento) {
        evento.preventDefault();

        // Detiene el proceso si existen errores de validación
        if (!validarFormulario()) {
            return;
        }

        // Cálculo de costos unitario y total
        const precioUnitario = funcion.precioBase * MULTIPLICADOR_TIPO_BOLETO[tipoBoleto];
        const total = precioUnitario * cantidad;

        // Construcción del registro de compra
        const compra = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            peliculaId: pelicula.id,
            peliculaTitulo: pelicula.titulo,
            genero: pelicula.genero,
            funcionId: funcion.id,
            fechaFuncion: funcion.fecha,
            horario: funcion.horario,
            sala: funcion.sala,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            cantidad,
            tipoBoleto,
            asientos: asientosSeleccionados,
            precioUnitario,
            total,
            fecha: new Date().toISOString()
        };

        // Notifica al componente padre sobre la compra realizada
        onConfirmarCompra(compra);
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                {/* Encabezado con información de la película y función seleccionada */}
                <div className="d-flex align-items-center gap-3 mb-3">
                    {pelicula.posterUrl && (
                        <img
                            src={pelicula.posterUrl}
                            alt={"Póster de " + pelicula.titulo}
                            className="ticket-poster-thumb"
                        />
                    )}
                    <div>
                        <h4 className="card-title mb-1">{pelicula.titulo}</h4>
                        <p className="text-muted mb-0">
                            {formatearFecha(funcion.fecha)} · {funcion.horario} · {funcion.sala} · Precio base ${funcion.precioBase.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Formulario de captura de datos de compra */}
                <form onSubmit={manejarEnvio}>
                    {/* Campos de datos personales del comprador */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            {errores.nombre && (
                                <p className="text-danger small mt-1 mb-0">{errores.nombre}</p>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                className="form-control"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                            {errores.apellido && (
                                <p className="text-danger small mt-1 mb-0">{errores.apellido}</p>
                            )}
                        </div>
                    </div>

                    {/* Configuración de cantidad y categoría del boleto */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="cantidad">Cantidad de boletos</label>
                            <input
                                type="number"
                                id="cantidad"
                                className="form-control"
                                min="1"
                                max="6"
                                value={cantidad}
                                onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}
                            />
                            {errores.cantidad && (
                                <p className="text-danger small mt-1 mb-0">{errores.cantidad}</p>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="tipoBoleto">Tipo de boleto</label>
                            <select
                                id="tipoBoleto"
                                className="form-select"
                                value={tipoBoleto}
                                onChange={(e) => setTipoBoleto(e.target.value)}
                            >
                                <option value="General">General</option>
                                <option value="Preferencial">Preferencial</option>
                                <option value="VIP">VIP</option>
                            </select>
                        </div>
                    </div>

                    {/* Módulo de selección de asientos en sala */}
                    <SeatSelector
                        ocupados={asientosOcupados}
                        seleccionados={asientosSeleccionados}
                        cantidad={cantidad}
                        onToggleAsiento={alternarAsiento}
                    />
                    {errores.asientos && (
                        <p className="text-danger small mb-3">{errores.asientos}</p>
                    )}

                    {/* Indicador del costo total calculado */}
                    <p className="fw-bold fs-5">
                        Total: ${(funcion.precioBase * MULTIPLICADOR_TIPO_BOLETO[tipoBoleto] * cantidad).toFixed(2)}
                    </p>

                    {/* Botones de acción para confirmar o cancelar */}
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-danger">Confirmar compra</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

