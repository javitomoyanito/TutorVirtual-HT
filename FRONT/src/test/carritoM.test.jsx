import { useCarrito } from "../store/useCarrito.js";
import { describe, test, expect, beforeEach } from "vitest";


//MTR

// INICIAMOS EL CARRITO VACIO
beforeEach(() => {
  useCarrito.setState({ items: [] });
  localStorage.clear();
});
// PROBAMOS AGREGAR PRODUCTOS AL CARRITO
test("agrega un producto al carrito", () => {
  const { addItem, items } = useCarrito.getState();

  addItem({ id: 1, nombre: "Peluche Totoro" });

  expect(useCarrito.getState().items).toHaveLength(1);
  expect(useCarrito.getState().items[0].nombre).toBe("Peluche Totoro");
});
// PROBAMOS ELMINAR 1 PRODUCTO DEL CARRITO 
test("elimina un producto del carrito", () => {
  const { addItem, removeItem } = useCarrito.getState();
  
  addItem({ id: 1, nombre: "Peluche Totoro" });
  addItem({ id: 2, nombre: "Peluche Pikachu" });
    removeItem(1);
    const items = useCarrito.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].nombre).toBe("Peluche Pikachu");
});
// PROBAMOS ELIMINAR TODO EL CARRITO
test("debe vaciar completamente el carrito al eliminar todos los productos", () => {
    const { addItem, removeItem } = useCarrito.getState();

    addItem({ id: 10, nombre: "Stitch" });
    addItem({ id: 11, nombre: "Peluche Panda" });


    expect(useCarrito.getState().items.length).toBe(2);

    removeItem(10);
    removeItem(11);

    expect(useCarrito.getState().items.length).toBe(0);
  });


        
