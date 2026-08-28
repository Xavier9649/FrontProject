import React, { useState, useEffect } from "react";
import SeatSelector from "./SeatSelector.jsx";
import { MULTIPLICADOR_TIPO_BOLETO, formatearFecha } from "../data/peliculas.js";

// Módulo de compra, selección de asientos y validación

/**
 * Administra el formulario de compra de boletos, datos del usuario y asignación de asientos.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.pelicula - Datos de la película seleccionada.
 * @param {Object} props.funcion - Datos de la función (fecha, horario, sala y precio).
 * @param {Array<string>} props.asientosOcupados - Asientos no disponibles para la función.
 * @param {Function} props.onConfirmarCompra - Emite la compra completada.
 * @param {Function} props.onCancelar - Cancela la operación y regresa a la vista principal.
 * @returns {JSX.Element} Formulario de compra.
 */
export default function TicketForm({ pelicula, funcion, asientosOcupados, onConfirmarCompra, onCancelar }) {
    // Estados del formulario y selección de asientos
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [tipoBoleto, setTipoBoleto] = useState("General");
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [errores, setErrores] = useState({});

    // Ajusta la selección si disminuye la cantidad de boletos
    useEffect(() => {
        setAsientosSeleccionados((prev) => prev.slice(0, cantidad));
    }, [cantidad]);

    /**
     * Alterna la selección de un asiento respetando el límite establecido.
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
     * Valida los campos obligatorios, el rango de boletos y los asientos seleccionados.
     * 
     * @returns {boolean} True si no existen errores de validación; false en caso contrario.
     */
    function validarFormulario() {
        const nuevosErrores = {};

        if (!nombre.trim()) {
            nuevosErrores.nombre = "Por favor completa el campo de nombre.";
        }
        if (!apellido.trim()) {
            nuevosErrores.apellido = "Por favor completa el campo de apellido.";
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

    /**
     * Procesa la compra, calcula los totales y emite el registro final.
     * 
     * @param {Event} evento - Evento de envío del formulario.
     */
    function manejarEnvio(evento) {
        evento.preventDefault();

        // Cancela el envío si la validación falla
        if (!validarFormulario()) {
            return;
        }

        // Calcula precios unitario y total
        const precioUnitario = funcion.precioBase * MULTIPLICADOR_TIPO_BOLETO[tipoBoleto];
        const total = precioUnitario * cantidad;

        // Construye el objeto de compra
        const compra = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            peliculaId: pelicula.id,
            peliculaTitulo: pelicula.titulo,
            genero: pelicula.genero,
            funcionId: funcion.id,
            fechaFuncion: funcion.fecha,
            horario: funcion.horario,
            sala: funcion.sala,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            cantidad,
            tipoBoleto,
            asientos: asientosSeleccionados,
            precioUnitario,
            total,
            fecha: new Date().toISOString()
        };

        // Emite los datos de la compra confirmada
        onConfirmarCompra(compra);
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                {/* Encabezado con datos de la película y función */}
                <div className="d-flex align-items-center gap-3 mb-3">
                    {pelicula.posterUrl && (
                        <img
                            src={pelicula.posterUrl}
                            alt={"Póster de " + pelicula.titulo}
                            className="ticket-poster-thumb"
                        />
                    )}
                    <div>
                        <h4 className="card-title mb-1">{pelicula.titulo}</h4>
                        <p className="text-muted mb-0">
                            {formatearFecha(funcion.fecha)} · {funcion.horario} · {funcion.sala} · Precio base ${funcion.precioBase.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Formulario de compra */}
                <form onSubmit={manejarEnvio}>
                    {/* Datos del comprador */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            {errores.nombre && (
                                <p className="text-danger small mt-1 mb-0">{errores.nombre}</p>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                className="form-control"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                            {errores.apellido && (
                                <p className="text-danger small mt-1 mb-0">{errores.apellido}</p>
                            )}
                        </div>
                    </div>

                    {/* Cantidad y tipo de boleto */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="cantidad">Cantidad de boletos</label>
                            <input
                                type="number"
                                id="cantidad"
                                className="form-control"
                                min="1"
                                max="6"
                                value={cantidad}
                                onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}
                            />
                            {errores.cantidad && (
                                <p className="text-danger small mt-1 mb-0">{errores.cantidad}</p>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="tipoBoleto">Tipo de boleto</label>
                            <select
                                id="tipoBoleto"
                                className="form-select"
                                value={tipoBoleto}
                                onChange={(e) => setTipoBoleto(e.target.value)}
                            >
                                <option value="General">General</option>
                                <option value="Preferencial">Preferencial</option>
                                <option value="VIP">VIP</option>
                            </select>
                        </div>
                    </div>

                    {/* Selector de asientos */}
                    <SeatSelector
                        ocupados={asientosOcupados}
                        seleccionados={asientosSeleccionados}
                        cantidad={cantidad}
                        onToggleAsiento={alternarAsiento}
                        onLimpiarSeleccion={() => setAsientosSeleccionados([])}
                    />
                    {errores.asientos && (
                        <p className="text-danger small mb-3">{errores.asientos}</p>
                    )}

                    {/* Total a pagar */}
                    <p className="fw-bold fs-5">
                        Total: ${(funcion.precioBase * MULTIPLICADOR_TIPO_BOLETO[tipoBoleto] * cantidad).toFixed(2)}
                    </p>

                    {/* Acciones de compra */}
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-danger">Confirmar compra</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
