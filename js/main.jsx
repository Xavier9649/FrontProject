// Punto de Entrada: Inicialización y Montaje de la Aplicación React

// Obtiene el nodo contenedor del DOM con el identificador "root"
const contenedor = document.getElementById("root");

// Crea la raíz de renderizado de React sobre el contenedor
const raiz = ReactDOM.createRoot(contenedor);

// Renderiza el componente principal de la aplicación
raiz.render(<App />);

