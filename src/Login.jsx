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
    
    // URL de la API de Express (Asegúrate de que el servidor esté corriendo aquí)
    const API_URL = 'http://localhost:3000/api/auth'; 

    // Estado local para almacenar los datos del formulario (conservando nombres del frontend)
    const [formData, setFormData] = useState({
        usuario: '', 
        password: '' 
    });
    
    // ESTADOS AÑADIDOS para feedback (mensaje) y carga (loading)
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Maneja el cambio en los campos de entrada del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Lógica de autenticación real.
     * Mapea 'usuario' -> 'cedula' y 'password' -> 'contraseña' para el backend.
     */
    const handleLogin = async () => {
        setMessage(null);
        setLoading(true);

        if (!formData.usuario || !formData.password) {
             setMessage({ type: 'error', text: 'Por favor, ingrese usuario y contraseña.' });
             setLoading(false);
             return;
        }

        // CREAMOS EL PAYLOAD MAPEADO para que coincida con el backend
        const apiPayload = {
            cedula: formData.usuario,      // Mapeo: usuario (frontend) -> cedula (backend)
            contraseña: formData.password  // Mapeo: password (frontend) -> contraseña (backend)
        };

        try {
            console.log('Enviando petición a la API:', API_URL, apiPayload);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload), 
            });

            const result = await response.json();

            if (response.ok) {
                // Autenticación exitosa (código 200)
                setMessage({ type: 'success', text: result.mensaje || 'Inicio de sesión exitoso.' });
                console.log('Login Exitoso:', result);
                // Redirigir a la página de estacionamiento después de un breve delay
                setTimeout(() => onNavegar('estacionar'), 1500);
            } else {
                // Error de la API (400, 401, 409, 500)
                const errorText = result.detalle || result.error || 'Error desconocido del servidor.';
                setMessage({ type: 'error', text: `Fallo: ${errorText}` });
                console.error('Fallo de Autenticación:', result);
            }

        } catch (error) {
            console.error('Error de red o conexión al servidor:', error);
            setMessage({ 
                type: 'error', 
                text: `Error de conexión: ${error.message}. Verifique que:
                1. El backend esté activo en el puerto 3000
                2. No haya problemas de CORS
                3. La URL ${API_URL} sea correcta`
            });
        } finally {
            setLoading(false);
        }
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
                
                {/* Mensaje de Feedback (AÑADIDO) */}
                {message && (
                    <div className={`p-4 rounded-xl mb-6 text-center font-medium ${message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {message.text}
                    </div>
                )}


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
                            placeholder="Ingrese su usuario"
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
                            placeholder="Ingrese su contraseña"
                        />
                        
                        {/* Enlace para recuperación de contraseña */}
                        <div className="text-right mt-2">
                            <button 
                                className="text-white text-sm underline hover:text-gray-300 transition-colors"
                                // Reemplazo de alert() por el sistema de mensajes
                                onClick={() => setMessage({ type: 'info', text: 'Funcionalidad de recuperación pendiente.' })}
                            >
                                Olvidaste tu contraseña?
                            </button>
                        </div>
                    </div>

                </div>

                {/* Botón para enviar el formulario de login (ACTUALIZADO) */}
                <Button 
                    label={loading ? "Verificando..." : "ENTRAR"} // Muestra texto de carga
                    onClick={handleLogin}
                    disabled={loading} // Deshabilita durante la carga
                    className="w-full mt-8 py-4 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 border-0"
                    style={{ 
                        backgroundColor: loading ? '#60A5FA' : '#2563eb',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        padding: '1rem',
                        transition: 'background-color 0.3s'
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