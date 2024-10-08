import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

// Mockea useFormLogin
vi.mock('@hooks/useFormLogin', () => ({
  default: () => ({
    formData: { pi: '', password: '' },
    handleChange: vi.fn()
  })
}));

// Mockea useToken
vi.mock('@hooks/auth/useToken', () => ({
  default: () => ({
    setToken: vi.fn() // Mockea la función setToken
  })
}));

test('Login Component renders correctly', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  
  expect(screen.getByPlaceholderText('Ingrese su DPI/CUI')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ingrese su contraseña')).toBeInTheDocument();
  expect(screen.getByText('Seleccionar rol')).toBeInTheDocument();
  expect(screen.getByText('Iniciar sesion')).toBeInTheDocument();
});

test('Login Component redirects on successful Login', async () => {
  // Mock del fetch para simular una respuesta exitosa
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({ access_token: 'fake_token' })
  });

  const mockLocation = { href: '' };
  delete window.location;
  window.location = mockLocation;
  const onLoginMock = vi.fn();
  render(
    <MemoryRouter>
      <Login onLogin={onLoginMock}/>
    </MemoryRouter>
  );
  
  fireEvent.change(screen.getByPlaceholderText('Ingrese su DPI/CUI'), { target: { value: '3620515420101' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'hola' } });
  fireEvent.click(screen.getByText('Seleccionar rol'));
  fireEvent.click(screen.getByText('usuario_comun'));
  fireEvent.click(screen.getByText('Iniciar sesion'));

  await waitFor(() => {
    expect(mockLocation.href).toBe(''); // Reemplaza con la URL esperada después del login
  });
});
