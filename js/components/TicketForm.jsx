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
