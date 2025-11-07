import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Comentarios from "../pages/admin/Comentarios"; // ajusta la ruta si está en otro directorio

describe("Página de Comentarios", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("se renderiza correctamente y muestra mensaje si no hay comentarios", () => {
    render(<Comentarios />);

    
    expect(screen.getByText("Comentarios de Usuarios")).toBeInTheDocument();

    
    expect(screen.getByText("No hay comentarios aún.")).toBeInTheDocument();
  });

  it("muestra los comentarios guardados en localStorage", () => {

    const mockComentarios = [
      { nombre: "Ana", tipo: "Sugerencia", mensaje: "Me encantan los peluches" },
      { nombre: "Luis", tipo: "Reclamo", mensaje: "Uno llegó con un defecto" },
    ];
    localStorage.setItem("comentarios", JSON.stringify(mockComentarios));

    render(<Comentarios />);

    // El título siempre debe mostrarse
    expect(screen.getByText("Comentarios de Usuarios")).toBeInTheDocument();

    // Verificamos que los comentarios se muestren
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Sugerencia")).toBeInTheDocument();
    expect(screen.getByText("Me encantan los peluches")).toBeInTheDocument();

    expect(screen.getByText("Luis")).toBeInTheDocument();
    expect(screen.getByText("Reclamo")).toBeInTheDocument();
    expect(screen.getByText("Uno llegó con un defecto")).toBeInTheDocument();
  });
});
