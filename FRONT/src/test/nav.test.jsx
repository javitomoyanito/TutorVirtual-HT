import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "../components/Nav";

test("muestra el nombre de la tienda en el navbar", () => {
  render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );

  const title = screen.getByText(/millapeluche/i);
  expect(title).toBeInTheDocument();
});

