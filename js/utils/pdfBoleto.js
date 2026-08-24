// Módulo de Miguel: Generación y Descarga del Boleto en PDF (utiliza jsPDF por CDN)

/**
 * Función generarBoletoPDF
 * 
 * Genera un archivo PDF con formato de comprobante/recibo de cine (80mm x 150mm)
 * que resume los detalles de la compra realizada y activa su descarga automática
 * en el navegador del usuario.
 * 
 * @param {Object} compra - Objeto con los datos de la compra registrada.
 * @param {number|string} compra.id - Identificador único de la compra.
 * @param {string} compra.peliculaTitulo - Título de la película.
 * @param {string} compra.fechaFuncion - Fecha de la función en formato ISO (YYYY-MM-DD).
 * @param {string} compra.horario - Horario de la función (ej. "14:00").
 * @param {string} compra.sala - Nombre de la sala (ej. "Sala 1").
 * @param {string} compra.nombre - Nombre del cliente.
 * @param {string} compra.apellido - Apellido del cliente.
 * @param {string} compra.tipoBoleto - Categoría de boleto (General, Preferencial, VIP).
 * @param {Array<string>} compra.asientos - Lista de asientos asignados.
 * @param {number} compra.cantidad - Número de boletos comprados.
 * @param {number} compra.total - Importe total cancelado.
 * @param {string} compra.fecha - Fecha y hora de creación de la transacción en formato ISO.
 */
function generarBoletoPDF(compra) {
    const { jsPDF } = window.jspdf;

    // Configura el formato del documento: dimensiones compactas estilo recibo de cine (80mm x 150mm)
    const doc = new jsPDF({ unit: "mm", format: [80, 150] });
    const centro = 40;
    const margen = 8;
    let y = 14;

    // Encabezado principal del recibo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CENESTUR CINE", centro, y, { align: "center" });
    y += 6;

    // Subtítulo del comprobante
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Boleto de compra", centro, y, { align: "center" });
    y += 5;

    // Línea divisoria superior
    doc.setLineWidth(0.3);
    doc.line(margen, y, 80 - margen, y);
    y += 7;

    /**
     * Imprime una fila con etiqueta en negrita y valor en texto regular,
     * avanzando la posición vertical del cursor en el documento PDF.
     * 
     * @param {string} etiqueta - Nombre descriptivo del campo.
     * @param {string|number} valor - Contenido correspondiente al campo.
     */
    function fila(etiqueta, valor) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(etiqueta, margen, y);
        y += 4.5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(String(valor), margen, y);
        y += 6.5;
    }

    // Inserción de los detalles de la compra en el cuerpo del recibo
    fila("Película", compra.peliculaTitulo);
    fila("Función", formatearFecha(compra.fechaFuncion) + " · " + compra.horario + " · " + compra.sala);
    fila("Cliente", compra.nombre + " " + compra.apellido);
    fila("Tipo de boleto", compra.tipoBoleto);
    fila("Asientos", compra.asientos.join(", "));
    fila("Cantidad", compra.cantidad + " boleto(s)");
    fila("Total pagado", "$" + compra.total.toFixed(2));
    fila("Fecha de compra", new Date(compra.fecha).toLocaleString());

    // Línea divisoria inferior
    doc.setLineWidth(0.3);
    doc.line(margen, y, 80 - margen, y);
    y += 6;

    // Pie de página con código de verificación e instrucciones para el cliente
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Código de boleto: " + compra.id, centro, y, { align: "center" });
    y += 5;
    doc.text("Presenta este boleto en la entrada de la sala", centro, y, {
        align: "center",
        maxWidth: 64
    });

    // Guarda el archivo y dispara la descarga en el navegador
    doc.save("boleto_" + compra.id + ".pdf");
}

