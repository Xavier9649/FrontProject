import React from "react";

// Pie de página institucional

/**
 * Muestra el pie de página institucional y los créditos del proyecto.
 * 
 * @returns {JSX.Element} Pie de página.
 */
export default function Footer() {
    return (
        <footer className="bg-dark text-light text-center py-3 mt-5">
            {/* Información institucional */}
            <p className="mb-1">CENESTUR - Carrera de Desarrollo de Software - Front-End</p>
            {/* Créditos del equipo */}
            <p className="mb-0 small text-secondary">
                Sistema Web de Boletos de Cine · Erick, Miguel y Jorge
            </p>
        </footer>
    );
}
