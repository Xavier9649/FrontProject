# CENESTUR Cine - Sistema Web de Boletos de Cine

Proyecto Front-End - Carrera de Desarrollo de Software - CENESTUR  
Desarrolladores: **Erick, Miguel y Jorge**

Aplicación web para registrar y administrar la compra de boletos de cine: cartelera de películas, selección de función y asientos, historial de compras con búsqueda/filtros, y un panel de estadísticas. Los datos se guardan en el navegador con **LocalStorage**.

---

## Tecnologías

- **Node.js** & **Vite 6** (Entorno de desarrollo rápido y empaquetador moderno)
- **React 18** (Componentes funcionales, JSX, Hooks: `useState`, `useEffect`)
- **Bootstrap 5** (Layout responsive e interfaz base)
- **CSS3** (Estilos personalizados: mapa interactivo de asientos, efectos visuales)
- **LocalStorage** (Persistencia de transacciones en el navegador)
- **jsPDF** (Generación y descarga de comprobantes en PDF)
- **Git y GitHub**

---

## Cómo ejecutar el proyecto

### 1. Requisitos previos
Tener instalado **Node.js** (versión 18 o superior).

### 2. Instalación de dependencias
```bash
npm install
```

### 3. Iniciar en modo desarrollo
```bash
npm run dev
```
La aplicación se abrirá en tu navegador en `http://localhost:3000` (o el puerto asignado por Vite).

### 4. Compilar para producción
```bash
npm run build
```
Generará los archivos optimizados dentro de la carpeta `dist/`.

---

## Estructura del proyecto

```
boletos-cine-cenestur/
├── index.html                  # Punto de entrada HTML
├── package.json                # Configuración de scripts y dependencias npm
├── vite.config.js              # Configuración de Vite con plugin de React
├── src/
│   ├── main.jsx                # Punto de entrada React (renderiza App)
│   ├── App.jsx                 # Componente principal / coordinador de vistas
│   ├── styles.css              # Estilos personalizados (asientos, tarjetas, etc.)
│   ├── data/
│   │   └── peliculas.js        # Catálogo de películas, funciones, tarifas y utilidades
│   ├── utils/
│   │   └── pdfBoleto.js        # Miguel - Generación del boleto en PDF (jsPDF)
│   └── components/
│       ├── Navbar.jsx          # Erick - Barra de navegación superior
│       ├── Footer.jsx          # Erick - Pie de página institucional
│       ├── FilterBar.jsx       # Erick - Filtros de cartelera por género
│       ├── MovieCard.jsx       # Erick - Tarjeta individual de película
│       ├── MovieList.jsx       # Erick - Grilla de películas
│       ├── SeatSelector.jsx    # Miguel - Selector interactivo de asientos
│       ├── TicketForm.jsx      # Miguel - Formulario de compra y validaciones
│       ├── PurchaseSummary.jsx # Miguel - Resumen tras registrar la compra
│       ├── SearchBar.jsx       # Jorge - Barra de búsqueda reutilizable
│       ├── PurchaseItem.jsx    # Jorge - Fila individual del historial (edición/eliminación)
│       ├── PurchaseList.jsx    # Jorge - Tabla del historial con filtros
│       └── Statistics.jsx      # Jorge - Panel analítico de estadísticas de ventas
```

---

## Módulos y Responsabilidades del Equipo

- **Módulo 1 (Erick): Cartelera y Navegación**
  - Barra de navegación interactiva (`Navbar.jsx`).
  - Filtrado por género cinematográfico (`FilterBar.jsx`).
  - Renderizado de tarjetas de películas con sus horarios y salas (`MovieCard.jsx`, `MovieList.jsx`).
  - Pie de página institucional (`Footer.jsx`).

- **Módulo 2 (Miguel): Proceso de Compra y Generación de Comprobante**
  - Formulario de registro de compra y cálculo de tarifas según tipo de boleto (`TicketForm.jsx`).
  - Selector interactivo de asientos con control de ocupación (`SeatSelector.jsx`).
  - Confirmación de compra (`PurchaseSummary.jsx`).
  - Generación y descarga automática del boleto en formato PDF (`pdfBoleto.js`).

- **Módulo 3 (Jorge): Historial de Ventas y Estadísticas**
  - Campo de búsqueda reutilizable (`SearchBar.jsx`).
  - Historial de compras con operaciones completas de edición y eliminación (`PurchaseList.jsx`, `PurchaseItem.jsx`).
  - Filtro por categoría de boleto en el historial.
  - Panel analítico con KPIs (ventas totales, boletos, recaudación) y gráficos de barras por película, sala y fecha (`Statistics.jsx`).
