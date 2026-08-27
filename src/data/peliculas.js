// Módulo de Datos y Utilidades de Cartelera: Catálogo, Tarifas, Asientos y Formateo

/**
 * Catálogo general de películas disponibles en cartelera durante agosto de 2026.
 * Incluye metadatos descriptivos (título, género, duración, clasificación, póster)
 * y la programación de funciones disponibles con sus respectivos horarios, salas y precios base.
 * Los enlaces de los pósters provienen de imágenes de dominio público/educativo de Wikipedia.
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
 * Factores de multiplicación de precio según la categoría del boleto.
 * El importe base de la función se multiplica por este factor para determinar el precio final.
 */
export const MULTIPLICADOR_TIPO_BOLETO = {
    General: 1,
    Preferencial: 1.5,
    VIP: 2
};

/**
 * Función generarMapaAsientos
 * 
 * Construye la distribución alfanumérica estándar de asientos para una sala de cine.
 * Genera una matriz de 4 filas identificadas con letras (A a D) y 6 columnas numeradas (1 a 6),
 * totalizando 24 asientos por sala.
 * 
 * @returns {Array<string>} Arreglo con las etiquetas de los asientos (ej. ["A1", "A2", ..., "D6"]).
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
 * Mapa de asientos precalculado y compartido por todas las salas.
 */
export const MAPA_ASIENTOS = generarMapaAsientos();

/**
 * Función formatearFecha
 * 
 * Transforma una fecha en formato ISO estándar ("YYYY-MM-DD") en una cadena amigable
 * y legible en idioma español con día de la semana y mes abreviados (ej. "Lun, 24 ago").
 * 
 * @param {string} fechaISO - Cadena de fecha en formato "YYYY-MM-DD".
 * @returns {string} Fecha formateada y capitalizada para su presentación al usuario.
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
