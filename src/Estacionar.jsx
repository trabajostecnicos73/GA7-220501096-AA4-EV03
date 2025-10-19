import React from 'react';

/**
 * Componente funcional: Estacionar.
 * Vista principal de estacionamiento. (Placeholder)
 */
const Estacionar = ({ onNavegar }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-green-100">
            <h1 className="text-4xl font-bold text-green-700">VISTA DE ESTACIONAR</h1>
            <p className="mt-4 text-gray-600">
                Aquí irá el mapa o la interfaz de inicio de un estacionamiento.
            </p>
            <button 
                className="mt-6 text-blue-500 underline"
                onClick={() => onNavegar('bienvenida')}
            >
                Volver a Bienvenida
            </button>
        </div>
    );
};

export default Estacionar;