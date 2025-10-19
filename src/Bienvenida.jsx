import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import logotipoSmartParking from './assets/logotipoSmartParking.jpg';

/**
 * Componente funcional: Bienvenida.
 * Representa la primera interfaz de la aplicación "SMARTPARKING"
 * con el logo y los botones de navegación iniciales.
 * Optimizado para mobile-first con soporte para tablet y PC.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onNavegar - Función para cambiar la vista en App.jsx.
 */
const Bienvenida = ({ onNavegar }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-center p-4 sm:p-6 md:p-8">
            
            {/* Logo Container - Responsivo */}
            <Card className="mb-4 sm:mb-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-center p-4 sm:p-6 md:p-8">
                    <img 
                        src={logotipoSmartParking} 
                        alt="Logo SmartParking" 
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-lg" 
                    />
                </div>
            </Card>

            {/* Título de Bienvenida - Escalable */}
            <h2 className="text-base sm:text-lg md:text-xl font-light tracking-widest text-gray-600 mt-2 sm:mt-4">
                BIENVENIDO A
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider mb-8 sm:mb-10 md:mb-12 text-gray-900">
                SMARTPARKING
            </h1>

            {/* Botones de Navegación - Responsivos */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col gap-4 sm:gap-5 md:gap-6 px-4 sm:px-0">
                
                {/* Botón Estacionar */}
                <Button 
                    label="Estacionar" 
                    severity="success"
                    size="large"
                    className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg md:text-xl py-3 sm:py-4"
                    onClick={() => onNavegar('estacionar')}
                />
                
                {/* Botón Iniciar Sesión */}
                <Button 
                    label="Iniciar Sesión" 
                    severity="info"
                    size="large"
                    className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg md:text-xl py-3 sm:py-4"
                    onClick={() => onNavegar('login')}
                />
                
                {/* Botón Registrarse */}
                <Button 
                    label="Registrarse" 
                    severity="secondary"
                    size="large"
                    outlined
                    className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg md:text-xl py-3 sm:py-4"
                    onClick={() => onNavegar('registro')}
                />

            </div>

            {/* Footer opcional - Solo visible en tablets y PC */}
            <div className="hidden sm:block mt-8 md:mt-12">
                <p className="text-xs sm:text-sm text-gray-500">
                    © 2025 SmartParking - Estacionamiento Inteligente
                </p>
            </div>
        </div>
    );
};

export default Bienvenida;