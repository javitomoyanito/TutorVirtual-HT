import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductosAdmin from "../pages/admin/ProductosAdmin.jsx";
import axios from "axios";

// Evitamos errores de llamadas a la API durante el render
vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Formulario de ProductosAdmin", () => {
  it("muestra los campos para añadir productos", async () => {
    render(
      <MemoryRouter>
        <ProductosAdmin />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descripción")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Precio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Stock")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("URL Imagen")).toBeInTheDocument();


    expect(screen.getByText("Agregar producto")).toBeInTheDocument();
  });

});
