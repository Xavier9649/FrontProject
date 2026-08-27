import React from "react";

// Componente Reutilizable: Barra de Búsqueda (Módulo de Jorge e Integración Módulo de Erick)

/**
 * Componente SearchBar
 * 
 * Renderiza un campo de búsqueda controlado reutilizable en toda la aplicación.
 * Se utiliza tanto para buscar películas en la cartelera (Módulo de Erick)
 * como para buscar transacciones en el historial de compras (Módulo de Jorge).
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.id="busquedaHistorial"] - Identificador único para el elemento input y su etiqueta.
 * @param {string} [props.label="Buscar por película, nombre o apellido"] - Texto de la etiqueta del campo.
 * @param {string} [props.placeholder="Ej. Frontera Estelar, García..."] - Texto de ayuda dentro del input.
 * @param {string} props.valor - Valor actual del texto de búsqueda.
 * @param {Function} props.onCambiar - Callback que se ejecuta cuando el usuario modifica el texto.
 * @returns {JSX.Element} Elemento JSX que contiene la etiqueta y el input de búsqueda.
 */
export default function SearchBar({
    id = "busquedaHistorial",
    label = "Buscar por película, nombre o apellido",
    placeholder = "Ej. Frontera Estelar, García...",
    valor,
    onCambiar
}) {
    return (
        <div className="mb-3">
            {/* Etiqueta asociada al campo de búsqueda */}
            <label className="form-label" htmlFor={id}>
                {label}
            </label>

            {/* Campo de texto controlado */}
            <input
                type="text"
                id={id}
                className="form-control"
                placeholder={placeholder}
                value={valor}
                onChange={(e) => onCambiar(e.target.value)}
            />
        </div>
    );
}
