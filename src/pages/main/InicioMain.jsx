import { Link } from 'react-router-dom';
import ChatMockup from './ChatMockup'; 

export default function InicioMain() {
  return (
    <section className="mx-auto max-w-auot px-4 py-16 bg-slate-700 min-h-screen">
      <div className=" md:grid-cols-12 gap-10 items-center">        
        <div className="justify-top md:col-span-7">
          <div className="inline-flex items-center gap-2 bg-teal-600 rounded-full px-3 py-1 mb-4 text-sm text-white">
            <span></span><span>SOLARI TU TUTOR VIRTUAL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
            Bienvenido a <span className="text-white">SOLARI</span>
          </h1>
          <p className="text-lg opacity-90 mb-6 text-white">
            Tu asistente educativo impulsado por inteligencia artificial.
          </p>
        </div>
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className='flex justify-center'>
            <img 
              className="h-48 rounded-xl" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnsUZb81FWSApANPMEtXXax4xRUB5JqntyUQ&s" 
              alt="Logo Tutor" 
            />
          </div>
          <ChatMockup />
          <button className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
            Carga tus archivos
          </button>
        </div>
      </div>
    </section>
  )
}