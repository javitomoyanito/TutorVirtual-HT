import { screen, render } from '@testing-library/react';
import Contacto from '../pages/main/Contacto.jsx';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('Envio de Formulario',()=>{
    it('1.Render formularioC',async ()=>{
        render(
            <MemoryRouter>
                <Contacto />
            </MemoryRouter>
        )
        const contactoTitulo=screen.getByRole('heading',{name:/Contáctanos/i})
        const nombre=screen.getByRole('textbox',{name:/Nombre:/i})
        const seleccion=screen.getByRole('combobox',{name:/Tipo:/i})
        const mensaje=screen.getByRole('textbox',{name:/Mensaje:/i})
        const btn=screen.getByRole('button',{name:/Enviar/i})

        const mono=userEvent.setup()
        await mono.type(nombre,'Juan Perez')
        await mono.selectOptions(seleccion,'sugerencia')
        await mono.type(mensaje,'Me encanta su servicio!')
        await mono.click(btn)

        expect(contactoTitulo).toBeInTheDocument()
        expect(nombre).toBeInTheDocument()
        expect(seleccion).toBeInTheDocument()
        expect(mensaje).toBeInTheDocument()
    })
})