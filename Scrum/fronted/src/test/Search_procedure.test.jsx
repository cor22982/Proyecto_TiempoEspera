import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';



test('Search procedure', async () => {
  render(
      <App />
  );
  await waitFor(() => {
    expect(document.querySelector('.logo')).toBeNull();
  }, { timeout: 4000 }); 

  fireEvent.change(screen.getByPlaceholderText('Ingrese su DPI/CUI'), { target: { value: '3620515420101' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'hola' } });
  fireEvent.click(screen.getByText('usuario_comun'));
  fireEvent.click(screen.getByText('Iniciar sesion'));

  await waitFor(() => {
    expect(screen.getByPlaceholderText('Buscar tramite')).toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText('Buscar tramite'), { target: { value: 'cita controlada' } });
  fireEvent.keyDown(screen.getByPlaceholderText('Buscar tramite'), { key: 'Enter', code: 'Enter', charCode: 13 });

  await {timeout: 5000}
  screen.debug(); 
 
});
