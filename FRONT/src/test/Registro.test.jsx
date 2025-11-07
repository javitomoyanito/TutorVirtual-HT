import { screen, render } from '@testing-library/react';
import Registro from '../pages/main/RegistroUsuario.jsx';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';



const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();   
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
        Link: (props) => <a href={props.to} {...props} /> 
    };
});

const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; },
        removeItem: (key) => { delete store[key]; }
};
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });



describe('Registro Usuario', () => {
    let alertMock;
    beforeEach(() => {
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    mockedNavigate.mockClear();
    localStorage.clear();
    });
    
    beforeEach(() => {
        alertMock.mockClear();
        mockedNavigate.mockClear(); 
        localStorage.clear();
    });

    it('1. Render Registro', () => { 
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        )
        const RegistroTitulo=screen.getByRole('heading',{name:/Registrarse/i})
        expect (RegistroTitulo).toBeInTheDocument() 
    })

    it('2. Ingreso datos', async () => {
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        )
        const nombre = screen.getByPlaceholderText('Nombre de usuario');
        const correo = screen.getByPlaceholderText('Correo electrónico');
        const contraseña = screen.getByPlaceholderText('Contraseña');
        const btn = screen.getByRole('button', { name: /Crear cuenta/i });

        await userEvent.type(nombre,'johndoe');
        await userEvent.type(correo,'johndoe@example.com');
        await userEvent.type(contraseña,'password123'); 
        await userEvent.click(btn);

        expect(alertMock).toHaveBeenCalledWith('Registro exitoso. Ahora puedes iniciar sesión.');
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    })
})
