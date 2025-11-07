import React, { useState } from 'react';

function Login() {
   const [usuario, setUsuario] = useState(''); 
   const [contrasena, setContrasena] = useState(''); 

   const handleSubmit = (event) => {
       event.preventDefault();
       window.open('/inicio'); 
       console.log('Iniciando sesión con:');
       console.log('Usuario:', usuario);
       console.log('Contraseña:', contrasena);
   };
  const [mode, setMode] = useState('profesor'); 
  const [emial, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleModeChange = (e) => {
    e.preventDefault();
    console.log(`Cambiando modo a: ${mode}`);
    {emial,password}
        alert(`Ingresando como ${mode}`);
    window.open(mode === 'profesor' ? '/profesor' : '/inicio');
  }

  const posisionLogin = mode === 'profesor' ? 'Profesor'
  ? 'md:justify-end': 'md:justify-start' : 'md:justify-start';

  const colorLogin = mode === 'profesor' ? 'bg-blue-600 hover:bg-blue-700'
  : 'bg-teal-800 hover:bg-teal-900';

  focus:ring-indigo-500;
   return (
       <div className="flex flex-col md:flex-row items-center justify-start min-h-screen w-500 bg-slate-700 font-sans">
           <form onSubmit={handleSubmit} className="bg-orange-50 p-8 rounded-xl shadow-lg min-w-500 h-screen">
          <div className="justify-center text-5xl mb-8 mr-8 ml-8 font-extrabold text-black font-sans">
            SOLARI AI
          </div>
               <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8 ">
                   Iniciar sesión
               </h2>
               <div className={`mb-4 w-full max-w-4xl flex items-center transition-all duration-700 ease-in-out ${posisionLogin}`}>
                   <input
                       type="text"
                       id="usuario"
                       placeholder="Usuario"
                       value={usuario}
                       onChange={(e) => setUsuario(e.target.value)} 
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"/>
               </div>
               <div className="mb-6">
                   <input
                       type="password"
                       id="contrasena"
                       placeholder="Contraseña"
                       value={contrasena}
                       onChange={(e) => setContrasena(e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"/>
               </div>
               <button 
                   type="submit" 
                   className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
               >
                   Entrar
               </button>

               <div className="text-center mt-6 text-gray-600 text-sm">
                   ¿No tienes cuenta?{' '}
                   <a href="/register" className="text-teal-500 hover:underline">
                       Regístrate
                   </a>
               </div>
                <div className="text-center mt-6 text-gray-600 text-sm">
                  ¿Quieres entrar como Profesor?
                  <a href="/profesor" className="text-teal-500 hover:underline">Ingresar como Profesor</a>

                </div>
           </form>
       </div>
   );
}

export default Login;