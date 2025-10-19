import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import logotipoSmartParking from './assets/logotipoSmartParking.jpg';

/**
 * Componente funcional: Login.
 * Representa la interfaz de inicio de sesión de la aplicación.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onNavegar - Función para cambiar la vista.
 */
const Login = ({ onNavegar }) => {
    // Estado local para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });

    // Maneja el cambio en los campos de entrada del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Simula el proceso de inicio de sesión
    const handleLogin = () => {
        console.log('Intentando iniciar sesión...', formData);
        alert('Login exitoso (simulado)');
        // Aquí iría la lógica de autenticación real
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            
            {/* Contenedor Principal del formulario de login */}
            <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-8 pb-10">
                
                {/* Sección del logo dentro de un cuadro azul */}
                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                        <img 
                            src={logotipoSmartParking} 
                            alt="Logo SmartParking" 
                            className="w-32 h-32 object-contain" 
                        />
                    </div>
                </div>

                {/* Título principal del formulario */}
                <h1 className="text-white text-3xl font-bold text-center mb-10">
                    Iniciar Sesión
                </h1>

                {/* Sección del formulario con campos de entrada */}
                <div className="space-y-6">
                    
                    {/* Campo de entrada para el usuario */}
                    <div>
                        <label htmlFor="usuario" className="block text-white text-lg font-medium mb-3">
                            Usuario
                        </label>
                        <InputText
                            id="usuario"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleInputChange}
                            className="w-full p-4 rounded-2xl text-lg"
                            placeholder=""
                        />
                    </div>
                    
                    {/* Campo de entrada para la contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-white text-lg font-medium mb-3">
                            Contraseña
                        </label>
                        <Password
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full"
                            inputClassName="w-full p-4 rounded-2xl text-lg"
                            toggleMask
                            feedback={false}
                            placeholder=""
                        />
                        
                        {/* Enlace para recuperación de contraseña */}
                        <div className="text-right mt-2">
                            <button 
                                className="text-white text-sm underline hover:text-gray-300 transition-colors"
                                onClick={() => alert('Recuperación de contraseña')}
                            >
                                Olvidaste tu contraseña?
                            </button>
                        </div>
                    </div>

                </div>

                {/* Botón para enviar el formulario de login */}
                <Button 
                    label="ENTRAR" 
                    onClick={handleLogin}
                    className="w-full mt-8 py-4 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 border-0"
                    style={{ 
                        backgroundColor: '#2563eb',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        padding: '1rem'
                    }}
                />

                {/* Enlace para redirigir al formulario de registro */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => onNavegar('registro')}
                        className="text-white text-sm hover:text-gray-300 transition-colors"
                    >
                        No tienes una cuenta? <span className="font-bold underline">REGISTRATE</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;
