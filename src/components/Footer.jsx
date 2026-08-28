import React from "react";

// Módulo de Erick: Pie de Página de la Aplicación

/**
 * Componente Footer
 * 
 * Despliega el pie de página institucional de la aplicación web.
 * Presenta los datos institucionales del instituto CENESTUR, la carrera
 * y los créditos de autoría del equipo de desarrollo (Erick, Miguel y Jorge).
 * 
 * @returns {JSX.Element} Elemento JSX que contiene la sección de pie de página.
 */
export default function Footer() {
    return (
        <footer className="bg-dark text-light text-center py-3 mt-5">
            {/* Información académica e institucional */}
            <p className="mb-1">CENESTUR - Carrera de Desarrollo de Software - Front-End</p>
            {/* Créditos del proyecto y miembros del equipo */}
            <p className="mb-0 small text-secondary">
                Sistema Web de Boletos de Cine · Erick, Miguel y Jorge
            </p>
        </footer>
    );
}
