import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';

/**
 * Componente funcional: Registro.
 * Vista de registro de nuevos usuarios con diseño como mockup.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onNavegar - Función para cambiar la vista.
 */
const Registro = ({ onNavegar }) => {
    // Estado local para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        email: '',
        password: '',
        confirmarPassword: '',
        aceptaTerminos: false
    });

    // Maneja los cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Maneja el envío del formulario de registro
    const handleSubmit = () => {
        // Verifica si se aceptaron los términos
        if (!formData.aceptaTerminos) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }
        // Verifica si las contraseñas coinciden
        if (formData.password !== formData.confirmarPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        // Muestra los datos en consola y simula un registro exitoso
        console.log('Datos de registro:', formData);
        alert('¡Registro exitoso! (simulado)');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            
            {/* Botón Home en la esquina superior derecha */}
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

                {/* Formulario */}
                <div className="space-y-4">
                    
                    {/* Campo para el nombre */}
                    <InputText
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        className="w-full p-4 rounded-2xl text-lg"
                    />

                    {/* Campo para el apellido */}
                    <InputText
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        placeholder="Apellido"
                        className="w-full p-4 rounded-2xl text-lg"
                    />

                    {/* Campo para el número de cédula */}
                    <InputText
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleInputChange}
                        placeholder="No. Cedula"
                        className="w-full p-4 rounded-2xl text-lg"
                    />

                    {/* Campo para el teléfono */}
                    <InputText
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="Telefono"
                        className="w-full p-4 rounded-2xl text-lg"
                    />

                    {/* Campo para el correo electrónico */}
                    <InputText
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo Electronico"
                        className="w-full p-4 rounded-2xl text-lg"
                    />

                    {/* Campo para la contraseña */}
                    <Password
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Contraseña"
                        className="w-full"
                        inputClassName="w-full p-4 rounded-2xl text-lg"
                        toggleMask
                        feedback={false}
                    />

                    {/* Campo para confirmar la contraseña */}
                    <Password
                        name="confirmarPassword"
                        value={formData.confirmarPassword}
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
                        checked={formData.aceptaTerminos}
                        onChange={(e) => setFormData(prev => ({ ...prev, aceptaTerminos: e.checked }))}
                        className="w-5 h-5"
                    />
                </div>

                {/* Botón para enviar el formulario de registro */}
                <Button
                    label="REGISTRARME"
                    onClick={handleSubmit}
                    className="w-full py-4 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 border-0"
                    style={{ 
                        backgroundColor: '#2563eb',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        padding: '1rem'
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