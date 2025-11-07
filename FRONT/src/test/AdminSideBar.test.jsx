import { screen, render } from '@testing-library/react';
import AdminLayout  from '../components/AdminSidebar.jsx';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 

import { MemoryRouter } from 'react-router-dom';

describe('AdminSidebar', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AdminLayout />
            </MemoryRouter>
        );
    });

    it ('debe renderizar el componente sin errores', () => {
        render(
            <MemoryRouter>
                <AdminLayout />
            </MemoryRouter>
        );
    });

 

    it('debe contener enlaces de navegación', () => {
        const dashboardLink = screen.getByText('🏠 Dashboard');
        const productsLink = screen.getByText('🧸 Productos');
        const usuariosLink = screen.getByText('👥 Usuarios');
        const informesLink = screen.getByText('📊 Informes');
    

        expect(dashboardLink).toBeInTheDocument();
        expect(productsLink).toBeInTheDocument();
        expect(usuariosLink).toBeInTheDocument();
        expect(informesLink).toBeInTheDocument();
       
    });

    it('ejecuta el logout al hacer clic en el botón', () => {
        localStorage.setItem("auth","true");

        render(
            <MemoryRouter>
                <AdminLayout />
            </MemoryRouter>
        );
        const [logoutButton] = screen.getAllByText("Cerrar sesión");
logoutButton.click();

expect(localStorage.getItem("user")).toBeNull();

});
});