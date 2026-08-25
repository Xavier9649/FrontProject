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
        const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

        if (!nombre.trim()) {
            nuevosErrores.nombre = "Por favor completa el campo de nombre.";
        } else if (!regexSoloLetras.test(nombre.trim())) {
            nuevosErrores.nombre = "El nombre no debe contener números ni símbolos.";
        }

        if (!apellido.trim()) {
            nuevosErrores.apellido = "Por favor completa el campo de apellido.";
        } else if (!regexSoloLetras.test(apellido.trim())) {
            nuevosErrores.apellido = "El apellido no debe contener números ni símbolos.";
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