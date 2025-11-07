import React, { useState } from 'react';
import { User, Shield, GraduationCap } from 'lucide-react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mode, setMode] = useState('estudiante');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Intentando iniciar sesión como ${mode} con usuario: ${usuario}`);
    console.log(`Modo: ${mode}, Usuario: ${usuario}, Contraseña: ${contrasena}`);
  };

  const formPositionClass = mode === 'profesor'
    ? 'md:justify-end' 
    : 'md:justify-start'; 

  const accentColor = mode === 'profesor'
    ? 'bg-orange-700 hover:bg-orange-800 focus:ring-red-500' 
    : 'bg-orange-500 hover:bg-orange-600 focus:ring-teal-500'; 

  return (
    <div 
      className="min-h-screen bg-orange-950 flex flex-col items-center p-4"
    >
      <div 
        // Contenedor para la transición lateral (se extiende a todo el ancho)
        className={`w-full max-w-7xl flex items-center transition-all duration-500 ease-in-out p-4 ${formPositionClass}`} 
      >
        {/* FORMULARIO: P-6 y MAX-W-SM para ancho compacto */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
          <div className="flex justify-center mb-4 p-3 min-w-0">
            {/* IMAGEN: SIZE-52 para ancho compacto */}
            <img className="size-52 rounded-xl shadow-2xl" src="./public/images/solari_icon.png" alt="Logo Solari AI" />
          </div>
          {/* TÍTULO PRINCIPAL */}
          <div className="text-center text-4xl mb-4 font-extrabold text-gray-900 font-sans shadow-500/50">
            SOLARI AI
          </div>
          {/* TÍTULO SECUNDARIO */}
          <h2 className={`text-2xl font-semibold text-center mb-4 transition-colors duration-300 ${mode === 'profesor' ? 'text-orange-700' : 'text-orange-500'}`}>
            Iniciar como {mode === 'profesor' ? 'Profesor' : 'Estudiante'}
          </h2>
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button" 
              onClick={() => setMode('estudiante')}
              className={`flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
                mode === 'estudiante' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-white'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Estudiante
            </button>
            <button
              type="button"
              onClick={() => setMode('profesor')}
              className={`flex-1 flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
                mode === 'profesor' ? 'bg-orange-700 text-white shadow-md' : 'text-gray-700 hover:bg-white'
              }`}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Profesor
            </button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="usuario"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          {/* CAMBIO 2: Reducir margen inferior de la contraseña (mb-6 -> mb-4) */}
          <div className="mb-4">
            <input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>          
          <button 
            type="submit" 
            className={`w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ${accentColor}`}
          >
            Entrar
          </button>
          {/* CAMBIO 3: Reducir margen superior del enlace (mt-6 -> mt-4) */}
          <div className="text-center mt-4 text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-orange-500 hover:underline">
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;