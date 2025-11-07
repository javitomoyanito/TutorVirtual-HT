import React, { useState } from 'react';
import { User, Shield, GraduationCap } from 'lucide-react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mode, setMode] = useState('estudiante');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Intentando iniciar sesión como ${mode} con usuario: ${usuario}`);
    console.log(`Modo: ${mode}, Usuario: ${usuario}, Contraseña: ${contrasena}`);
  };


  const formPositionClass = mode === 'profesor'
    ? 'md:justify-end' 
    : 'md:justify-start'; 

  const accentColor = mode === 'profesor'
    ? 'bg-orange-700 hover:bg-red-700 focus:ring-red-500' 
    : 'bg-orange-500 hover:bg-teal-900 focus:ring-teal-500'; 
  return (
    <div className="min-h-screen bg-orange-950 flex flex-col items-center p-4">
      <div 
        className={`w-full max-w-4xl flex items-center mt-20 transition-transform duration-1000  ${formPositionClass}`}
      >
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex justify-center mb-4 p-3 min-w-0 ">
            <img className="size-64 rounded-xl shadow-2xl" src="./public/images/solari_icon.png" alt="" />
          </div>
          <div className="text-center text-5xl mb-6 font-extrabold text-gray-900 font-sans shadow-500/50">
            SOLARI AI
          </div>
          <h2 className={`text-2xl font-semibold text-center mb-6 transition-colors duration-300 ${mode === 'profesor' ? 'text-orange-700' : 'text-orange-500'}`}>
            Iniciar Sesión como {mode === 'profesor' ? 'Profesor' : 'Estudiante'}
          </h2>
          <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
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
          <div className="mb-6">
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
          <div className="text-center mt-6 text-gray-600 text-sm">
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