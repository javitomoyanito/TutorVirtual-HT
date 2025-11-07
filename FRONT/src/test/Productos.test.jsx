import { screen, render } from '@testing-library/react';
import Productos from '../pages/main/Productos.jsx';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

vi.mock('axios');
const handleAddMock = vi.fn(); 
vi.mock('../../store/useCarrito', () => ({
    useCarrito: () => ({
        items: [],
        handleAdd: handleAddMock,
    })
}));

describe('Página de Productos', () => {

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { id: 1, nombre: 'Peluche Mono', precio: 1500, imagen: '' },
                { id: 2, nombre: 'Peluche Oso', precio: 2000, imagen: '' },
            ]
        });

        handleAddMock.mockClear();
    });

    it('1. Render Productos', () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        )
        const ProductosTitulo = screen.getByRole('heading', { name: /Nuestros Peluches/i })
        expect(ProductosTitulo).toBeInTheDocument()
    });

    it('2. Agregar al carrito', async () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        )
        const mono = userEvent.setup();
        const btnAgregar = (await screen.findAllByRole('button', {
            name: /Agregar al carrito/i}))[0]; 
        await mono.click(btnAgregar);

        
    });

});