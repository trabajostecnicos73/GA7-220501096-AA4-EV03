import React, { useState } from 'react';
import Bienvenida from './Bienvenida.jsx';
import Login from './Login.jsx';
import Registro from './Registro.jsx';
import Estacionar from './Estacionar.jsx';

/**
 * Componente principal de la aplicación SMARTPARKING.
 * Maneja la navegación entre diferentes vistas.
 */
function App() {
    // Estado para controlar qué vista se muestra
    const [vistaActual, setVistaActual] = useState('bienvenida');

    /**
     * Función para cambiar de vista
     * @param {string} vista - Nombre de la vista a mostrar ('bienvenida', 'login', 'registro', 'estacionar')
     */
    const manejarNavegacion = (vista) => {
        setVistaActual(vista);
    };

    // Renderiza la vista correspondiente según el estado
    const renderizarVista = () => {
        switch (vistaActual) {
            case 'bienvenida':
                return <Bienvenida onNavegar={manejarNavegacion} />;
            case 'login':
                return <Login onNavegar={manejarNavegacion} />;
            case 'registro':
                return <Registro onNavegar={manejarNavegacion} />;
            case 'estacionar':
                return <Estacionar onNavegar={manejarNavegacion} />;
            default:
                return <Bienvenida onNavegar={manejarNavegacion} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {renderizarVista()}
        </div>
    );
}

export default App;
