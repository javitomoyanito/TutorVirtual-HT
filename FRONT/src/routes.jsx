import React from "react";
import App from "./App.jsx";
import InicioMain from "./pages/main/InicioMain.jsx";
import RegistroUsuario from "./pages/main/RegistroUsuario.jsx";
import Login from "./pages/main/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Navbar from "./components/nav.jsx";
import DashboardProfesor from "./pages/profesor/DashboardProfesor.jsx";

const routes = [
  {
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Login /> },
      { path: "/inicio", element: <InicioMain /> },
      { path: "/registro", element: <RegistroUsuario /> },
      { path: "/profesor", element: <DashboardProfesor /> },
      { path: "/nav", element: <Navbar /> },
    ],
  },
];

export default routes;