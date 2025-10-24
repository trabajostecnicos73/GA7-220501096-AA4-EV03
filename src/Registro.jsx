import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';

const API_URL = 'http://localhost:3000/api/auth'; 

/**
 * Componente funcional: Registro.
 * Vista de registro de nuevos usuarios con conexión a la API de Express.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onNavegar - Función para cambiar la vista (ej. a 'login').
 */
const Registro = ({ onNavegar }) => {
    
    // Estado local para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        correo: '', // Cambiado de 'email' a 'correo' para coincidir con el backend
        contraseña: '', // Cambiado de 'password' a 'contraseña' para el payload de la API
        confirmarContraseña: '', // Campo extra para la confirmación en el frontend
        aceptaTerminos: false
    });
    
    // Estados para feedback (mensaje) y carga (loading)
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);


    // Maneja los cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    /**
     * Lógica principal de registro.
     * Envía los datos al endpoint /api/auth.
     */
    const handleRegistro = async () => {
        setMessage(null);
        setLoading(true);

        // 1. Validaciones del lado del cliente
        if (formData.contraseña !== formData.confirmarContraseña) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            setLoading(false);
            return;
        }

        if (!formData.aceptaTerminos) {
            setMessage({ type: 'error', text: 'Debes aceptar los términos y condiciones.' });
            setLoading(false);
            return;
        }

        // 2. Preparar el Payload (Datos a enviar a la API)
        const apiPayload = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            cedula: formData.cedula,
            telefono: formData.telefono,
            correo: formData.correo, // El backend espera 'correo'
            contraseña: formData.contraseña, // El backend espera 'contraseña'
        };
        
        // Validación de campos vacíos (el backend también lo hace, pero es mejor hacerlo aquí primero)
        const missingField = Object.entries(apiPayload).find(([, value]) => !value);
        if (missingField) {
             setMessage({ type: 'error', text: `Por favor, complete todos los campos (falta: ${missingField[0]}).` });
             setLoading(false);
             return;
        }


        // 3. Petición a la API
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload), 
            });

            const result = await response.json();

            if (response.ok) {
                // Código 201: Registro exitoso
                setMessage({ 
                    type: 'success', 
                    text: result.mensaje || '¡Registro exitoso! Serás redirigido al inicio de sesión.' 
                });
                
                // Redirigir al login después de un breve mensaje de éxito
                setTimeout(() => onNavegar('login'), 2500);

            } else {
                // Código de error (400, 409, 500, etc.)
                const errorText = result.detalle || result.error || 'Error desconocido del servidor.';
                setMessage({ type: 'error', text: `Fallo en el registro: ${errorText}` });
            }

        } catch (error) {
            console.error('Error de red o conexión al servidor:', error);
            setMessage({ 
                type: 'error', 
                text: `Error de conexión: No se pudo contactar al servidor (${API_URL}).` 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            
            {/* Botón Home */}
            <button
                onClick={() => onNavegar('bienvenida')}
                className="absolute top-6 right-10 text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Volver al inicio"
            >
                 <svg 
                     className="w-10 h-10" 
                     fill="currentColor" 
                     viewBox="0 0 20 20"
                 >
                     <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                 </svg>
            </button>

            {/* Contenedor Principal */}
            <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-8">
                
                {/* Título */}
                <h1 className="text-white text-3xl font-bold text-center mb-8 tracking-wide">
                    REGISTRO
                </h1>

                {/* Mensaje de Feedback */}
                {message && (
                    <div className={`p-4 rounded-xl mb-6 text-center font-medium ${message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {message.text}
                    </div>
                )}

                {/* Formulario */}
                <div className="space-y-4">
                    
                    {/* Campos de Nombre y Apellido */}
                    <InputText name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" className="w-full p-4 rounded-2xl text-lg" />
                    <InputText name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Apellido" className="w-full p-4 rounded-2xl text-lg" />

                    {/* Campos de Cédula y Teléfono */}
                    <InputText name="cedula" value={formData.cedula} onChange={handleInputChange} placeholder="No. Cedula" className="w-full p-4 rounded-2xl text-lg" />
                    <InputText name="telefono" type="tel" value={formData.telefono} onChange={handleInputChange} placeholder="Telefono" className="w-full p-4 rounded-2xl text-lg" />

                    {/* Campo para el correo electrónico */}
                    <InputText name="correo" type="email" value={formData.correo} onChange={handleInputChange} placeholder="Correo Electronico" className="w-full p-4 rounded-2xl text-lg" />

                    {/* Campo para la contraseña */}
                    <Password
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleInputChange}
                        placeholder="Contraseña"
                        className="w-full"
                        inputClassName="w-full p-4 rounded-2xl text-lg"
                        toggleMask
                        feedback={false}
                    />

                    {/* Campo para confirmar la contraseña */}
                    <Password
                        name="confirmarContraseña"
                        value={formData.confirmarContraseña}
                        onChange={handleInputChange}
                        placeholder="Confirmar Contraseña"
                        className="w-full"
                        inputClassName="w-full p-4 rounded-2xl text-lg"
                        toggleMask
                        feedback={false}
                    />

                </div>

                {/* Sección de aceptación de términos y condiciones */}
                <div className="flex items-center justify-center gap-3 mt-6 mb-6">
                    <button
                        onClick={() => alert('Términos y Condiciones de SmartParking')}
                        className="text-white text-sm underline hover:text-gray-300"
                    >
                        Terminos y Condiciones
                    </button>
                    <label className="text-white text-sm">Acepto</label>
                    <Checkbox
                        name="aceptaTerminos"
                        checked={formData.aceptaTerminos}
                        onChange={handleInputChange} // Usamos el manejador genérico
                        className="w-5 h-5"
                    />
                </div>

                {/* Botón para enviar el formulario de registro */}
                <Button
                    label={loading ? "REGISTRANDO..." : "REGISTRARME"}
                    onClick={handleRegistro}
                    disabled={loading} // Deshabilita el botón mientras carga
                    className="w-full py-4 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 border-0"
                    style={{ 
                        backgroundColor: loading ? '#60A5FA' : '#2563eb', // Cambia de color al cargar
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        padding: '1rem',
                        transition: 'background-color 0.3s'
                    }}
                />

                {/* Enlace para usuarios que ya tienen cuenta */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => onNavegar('login')}
                        className="text-white text-sm underline hover:text-gray-300"
                    >
                        Ya tengo una cuenta
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Registro;