// Generación y descarga de comprobantes en PDF
import { jsPDF } from "jspdf";
import { formatearFecha } from "../data/peliculas.js";

/**
 * Genera un comprobante en formato recibo (80mm x 150mm) y descarga el archivo PDF.
 * 
 * @param {Object} compra - Datos de la compra registrada.
 */
export function generarBoletoPDF(compra) {
    // Configura el formato compacto del documento (80mm x 150mm)
    const doc = new jsPDF({ unit: "mm", format: [80, 150] });
    const centro = 40;
    const margen = 8;
    let y = 14;

    // Encabezado del comprobante
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CENESTUR CINE", centro, y, { align: "center" });
    y += 6;

    // Subtítulo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Boleto de compra", centro, y, { align: "center" });
    y += 5;

    // Separador superior
    doc.setLineWidth(0.3);
    doc.line(margen, y, 80 - margen, y);
    y += 7;

    /**
     * Agrega una fila de datos con etiqueta en negrita al documento.
     * 
     * @param {string} etiqueta - Nombre del campo.
     * @param {string|number} valor - Valor del campo.
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

    // Agrega el detalle de la compra
    fila("Película", compra.peliculaTitulo);
    fila("Función", formatearFecha(compra.fechaFuncion) + " · " + compra.horario + " · " + compra.sala);
    fila("Cliente", compra.nombre + " " + compra.apellido);
    fila("Tipo de boleto", compra.tipoBoleto);
    fila("Asientos", compra.asientos.join(", "));
    fila("Cantidad", compra.cantidad + " boleto(s)");
    fila("Total pagado", "$" + compra.total.toFixed(2));
    fila("Fecha de compra", new Date(compra.fecha).toLocaleString());

    // Separador inferior
    doc.setLineWidth(0.3);
    doc.line(margen, y, 80 - margen, y);
    y += 6;

    // Pie del comprobante con código e instrucciones
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Código de boleto: " + compra.id, centro, y, { align: "center" });
    y += 5;
    doc.text("Presenta este boleto en la entrada de la sala", centro, y, {
        align: "center",
        maxWidth: 64
    });

    // Descarga el archivo PDF en el navegador
    doc.save("boleto_" + compra.id + ".pdf");
}
