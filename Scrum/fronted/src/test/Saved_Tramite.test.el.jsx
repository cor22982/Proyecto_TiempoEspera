import { test, expect} from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

test('Seved Tramite', async () => {
  render(<App />);

  await waitFor(() => {
    expect(document.querySelector('.logo')).toBeNull();
  }, { timeout: 4000 }); 

  //El empleador inicia sesion
  fireEvent.change(screen.getByPlaceholderText('Ingrese su DPI/CUI'), { target: { value: '3620515420101' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'hola' } });
  fireEvent.click(screen.getByText('empleador'));
  fireEvent.click(screen.getByText('Iniciar sesion'));

  await waitFor(() => {
    expect(screen.getByPlaceholderText('Buscar tramite')).toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText('Buscar tramite'), { target: { value: 'dpi' } });
  

  fireEvent.keyDown(screen.getByPlaceholderText('Buscar tramite'), { key: 'Enter', code: 'Enter', charCode: 13 });
  
  await waitFor(() => {
    expect(document.querySelector('.institution-image')).toBeInTheDocument();
  });


  // Selecciona el renap zona 1
  fireEvent.click(screen.getByText('Renap zona 1'));

  // Esperamos a que carge
  await waitFor(()=>{
    expect(document.querySelector('.tramite-container')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Agendar'));

  //presionamos el icono del ojo 
  const icon = screen.getByRole('img', { name: /clock/i });
  fireEvent.click(icon);

  //seleccionamos la hora
  fireEvent.click(screen.getByText('03'));
  fireEvent.click(screen.getByText('33'));
  const icon2 = screen.getByRole('img', { name: /calendar/i });
  fireEvent.click(icon2);

  fireEvent.click(screen.getByText('18/09/2024'))

  //El jefe agenda las citas
  fireEvent.click(screen.getByText('Agendar Citas'))

  await waitFor(()=>{
    expect(document.querySelector('.popup')).toBeInTheDocument();
  });
      
  //salimos cooomo jefe

  fireEvent.click(screen.getByText('Salir'));
  await waitFor(() => {
    expect(document.querySelector('.logo')).toBeNull();
  }, { timeout: 4000 }); 
  //TRABAJADOR
  fireEvent.change(screen.getByPlaceholderText('Ingrese su DPI/CUI'), { target: { value: '3620515420101' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'hola' } });
  fireEvent.click(screen.getByText('usuario_comun'));
  fireEvent.click(screen.getByText('Iniciar sesion'));

  fireEvent.click(screen.getByText('Guardados'));

  await waitFor(()=>{
    expect(screen.getByText('DPI')).toBeInTheDocument();
  });
  
});
