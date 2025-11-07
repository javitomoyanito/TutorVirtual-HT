import { screen, render } from '@testing-library/react';
import Carrito from '../pages/main/Carrito.jsx';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('Carrito de Compras', () => {

    it('1. Render Carrito', () => {
        render(
        <MemoryRouter>
            <Carrito />
        </MemoryRouter>
        )
        const CarritoTitulo=screen.getByRole('heading',{name:/Tu carrito 🛒/i})
        const link=screen.getByRole('link',{name:/Ir a productos/i})
        expect (link).toBeInTheDocument()
        expect (CarritoTitulo).toBeInTheDocument()
    })
    it('2. Carrito con items', async () => {
        render(
        <MemoryRouter>
            <Carrito />
        </MemoryRouter>
        )
        const mono = userEvent.setup();
        mono.click(screen.getByRole('link',{name:/Ir a productos/i}));
        expect (screen.getByRole('link',{name:/Ir a productos/i})).toBeInTheDocument();
    });
        
});