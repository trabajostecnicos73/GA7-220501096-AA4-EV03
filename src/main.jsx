import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa la función createRoot desde React DOM para renderizar la aplicación
import './index.css'; // Importa los estilos globales definidos en index.css
import App from './App.jsx'; // Importa el componente principal de la aplicación

const rootElement = document.getElementById('root'); // Obtiene el elemento HTML con id 'root' donde se montará la app

// Verifica si el elemento root existe, si no lanza un error
if (!rootElement) {
    throw new Error("No se pudo encontrar el elemento con id 'root' en index.html.");
}

// Renderiza la aplicación dentro del elemento root usando React.StrictMode para detectar posibles problemas
createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
