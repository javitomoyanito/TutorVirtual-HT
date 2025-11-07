import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "../pages/main/RegistroUsuario.jsx";
import Usuarios from "../pages/admin/UsuariosActivos.jsx";

beforeEach(() => {
  localStorage.clear();
});

describe("Registro y visualización de usuarios", () => {
  it("registra un nuevo usuario y lo muestra en la pantalla de admin", () => {
    // Renderizamos el componente de Registro
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Llenamos los campos
    const usernameInput = screen.getByPlaceholderText("Nombre de usuario");
    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const submitButton = screen.getByText("Crear cuenta");

    fireEvent.change(usernameInput, { target: { value: "juanito" } });
    fireEvent.change(emailInput, { target: { value: "juanito@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitButton);

    // Verificamos que el usuario se guardó en localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0]).toMatchObject({
      username: "juanito",
      email: "juanito@example.com",
      rol: "user",
    });

    // Renderizamos ahora la vista de admin (Usuarios)
    render(<Usuarios />);

    // Verificamos que aparezca el usuario en pantalla
    expect(screen.getByText("juanito")).toBeInTheDocument();
    expect(screen.getByText("juanito@example.com")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay usuarios registrados", () => {
    render(<Usuarios />);
    expect(screen.getByText(/No hay usuarios registrados/i)).toBeInTheDocument();
  });
  
});
