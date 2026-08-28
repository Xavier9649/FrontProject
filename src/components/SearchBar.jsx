import React from "react";

// Campo de búsqueda reutilizable

/**
 * Campo de búsqueda controlado reutilizable para cartelera e historial.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.id="busquedaHistorial"] - Identificador del input.
 * @param {string} [props.label="Buscar por película, nombre o apellido"] - Etiqueta del campo.
 * @param {string} [props.placeholder="Ej. Frontera Estelar, García..."] - Texto guía.
 * @param {string} props.valor - Valor actual de búsqueda.
 * @param {Function} props.onCambiar - Notifica cambios en el texto.
 * @returns {JSX.Element} Campo de búsqueda.
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
            {/* Etiqueta del campo */}
            <label className="form-label" htmlFor={id}>
                {label}
            </label>

            {/* Entrada de texto */}
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
