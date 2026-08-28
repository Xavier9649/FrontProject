// Catálogo de películas, tarifas y utilidades de cartelera

/**
 * Catálogo general de películas con datos técnicos y funciones programadas.
 */
export const PELICULAS = [
    {
        id: 1,
        titulo: "Mutiny",
        genero: "Acción",
        duracion: 95,
        clasificacion: "B15",
        colorPoster: "#e63946",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Mutiny_poster.jpeg/250px-Mutiny_poster.jpeg",
        funciones: [
            { id: 101, fecha: "2026-08-24", horario: "14:00", sala: "Sala 1", precioBase: 4 },
            { id: 102, fecha: "2026-08-24", horario: "17:30", sala: "Sala 1", precioBase: 4.5 },
            { id: 103, fecha: "2026-08-25", horario: "20:00", sala: "Sala 3", precioBase: 5 }
        ]
    },
    {
        id: 2,
        titulo: "Spa Weekend",
        genero: "Comedia",
        duracion: 97,
        clasificacion: "B15",
        colorPoster: "#f4a261",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Spa_Weekend_poster.jpg/250px-Spa_Weekend_poster.jpg",
        funciones: [
            { id: 201, fecha: "2026-08-24", horario: "13:00", sala: "Sala 2", precioBase: 3.5 },
            { id: 202, fecha: "2026-08-25", horario: "16:00", sala: "Sala 2", precioBase: 4 }
        ]
    },
    {
        id: 3,
        titulo: "Insidious: Out of the Further",
        genero: "Terror",
        duracion: 105,
        clasificacion: "C",
        colorPoster: "#1d3557",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Insidious_Fear_the_Dark_poster.jpg/250px-Insidious_Fear_the_Dark_poster.jpg",
        funciones: [
            { id: 301, fecha: "2026-08-24", horario: "18:00", sala: "Sala 3", precioBase: 4.5 },
            { id: 302, fecha: "2026-08-25", horario: "21:30", sala: "Sala 1", precioBase: 5 },
            { id: 303, fecha: "2026-08-26", horario: "22:30", sala: "Sala 2", precioBase: 5 }
        ]
    },
    {
        id: 4,
        titulo: "The Odyssey",
        genero: "Aventura",
        duracion: 140,
        clasificacion: "B",
        colorPoster: "#2a9d8f",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/The_Odyssey_%282026_film%29_poster.jpg/250px-The_Odyssey_%282026_film%29_poster.jpg",
        funciones: [
            { id: 401, fecha: "2026-08-24", horario: "15:00", sala: "Sala 4", precioBase: 4 },
            { id: 402, fecha: "2026-08-25", horario: "18:30", sala: "Sala 4", precioBase: 4.5 }
        ]
    },
    {
        id: 5,
        titulo: "The Beloved",
        genero: "Drama",
        duracion: 112,
        clasificacion: "B",
        colorPoster: "#6d597a",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/The_Beloved_%282026_film%29_poster.jpg/250px-The_Beloved_%282026_film%29_poster.jpg",
        funciones: [
            { id: 501, fecha: "2026-08-26", horario: "17:00", sala: "Sala 3", precioBase: 4.5 },
            { id: 502, fecha: "2026-08-27", horario: "20:30", sala: "Sala 3", precioBase: 5 }
        ]
    },
    {
        id: 6,
        titulo: "Project Hail Mary",
        genero: "Ciencia Ficción",
        duracion: 156,
        clasificacion: "B",
        colorPoster: "#457b9d",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Project_Hail_Mary_poster.jpg/250px-Project_Hail_Mary_poster.jpg",
        funciones: [
            { id: 601, fecha: "2026-08-24", horario: "15:30", sala: "Sala 4", precioBase: 5 },
            { id: 602, fecha: "2026-08-25", horario: "19:00", sala: "Sala 1", precioBase: 5.5 },
            { id: 603, fecha: "2026-08-26", horario: "22:00", sala: "Sala 4", precioBase: 5.5 }
        ]
    }
];

/**
 * Factores de multiplicación de precio por categoría de boleto.
 */
export const MULTIPLICADOR_TIPO_BOLETO = {
    General: 1,
    Preferencial: 1.5,
    VIP: 2
};

/**
 * Genera la cuadrícula de asientos estándar para una sala (4 filas x 6 columnas).
 * 
 * @returns {Array<string>} Lista de códigos de asientos (ej. ["A1", ..., "D6"]).
 */
export function generarMapaAsientos() {
    const filas = ["A", "B", "C", "D"];
    const asientos = [];
    filas.forEach((fila) => {
        for (let numero = 1; numero <= 6; numero++) {
            asientos.push(fila + numero);
        }
    });
    return asientos;
}

/**
 * Mapa de asientos compartido para las salas.
 */
export const MAPA_ASIENTOS = generarMapaAsientos();

/**
 * Formatea una fecha ISO ("YYYY-MM-DD") a formato legible en español (ej. "Lun, 24 ago").
 * 
 * @param {string} fechaISO - Cadena de fecha en formato ISO.
 * @returns {string} Fecha formateada.
 */
export function formatearFecha(fechaISO) {
    if (!fechaISO) {
        return "Fecha no disponible";
    }
    const fecha = new Date(fechaISO + "T00:00:00");
    const texto = fecha.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
