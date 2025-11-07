import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardProfesor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-700">
          Panel del Profesor 🎓
        </h1>
        <button
          onClick={() => navigate("/inicio")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Cerrar sesión
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100 hover:shadow-lg transition">
          <h2 className="text-lg font-medium text-blue-600 mb-2">
            👩‍🎓 Lista de alumnos
          </h2>
          <p className="text-gray-600 text-sm">
            Visualiza todos tus estudiantes y sus progresos.
          </p>
          <button className="mt-3 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm">
            Ver alumnos
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100 hover:shadow-lg transition">
          <h2 className="text-lg font-medium text-blue-600 mb-2">
            📊 Reportes de desempeño
          </h2>
          <p className="text-gray-600 text-sm">
            Revisa estadísticas de notas, asistencia y participación.
          </p>
          <button className="mt-3 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm">
            Ver reportes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100 hover:shadow-lg transition">
          <h2 className="text-lg font-medium text-blue-600 mb-2">
            💬 Chat con estudiantes
          </h2>
          <p className="text-gray-600 text-sm">
            Comunícate directamente con tus alumnos para orientarlos.
          </p>
          <button className="mt-3 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm">
            Abrir chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfesor;