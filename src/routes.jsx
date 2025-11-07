import React from "react";
import App from "./App";
import InicioMain from "./pages/main/InicioMain";
import RegistroUsuario from "./pages/main/RegistroUsuario";
import Login from "./pages/main/Login";
import ErrorPage from "./pages/ErrorPage.jsx";
import Navbar from "./components/nav.jsx";
const routes = [
  {
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Login /> },
      { path: "/inicio", element: <InicioMain /> },
      { path: "/registro", element: <RegistroUsuario /> },
      { path: "/nav", element: <Navbar /> },
    ],
  },
];

export default routes;