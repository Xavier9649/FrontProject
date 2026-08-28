import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import App from "./App.jsx";

// Punto de entrada: inicialización y montaje de la aplicación
const contenedor = document.getElementById("root");
const raiz = ReactDOM.createRoot(contenedor);

raiz.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
