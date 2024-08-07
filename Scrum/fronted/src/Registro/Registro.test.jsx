import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Registro from './Registro';

// Mock the custom hooks and components
vi.mock('@hooks/useFormLogin', () => ({
  default: () => ({
    formData: { pi: '', name: '', lastname: '', age: '', password: '' },
    handleChange: vi.fn()
  })
}));

vi.mock('js-md5', () => ({
  md5: vi.fn().mockReturnValue('hashed_password')
}));

test('Registro Component renders correctly', () => {
  render(<Registro />);
  expect(screen.getByPlaceholderText('Ingrese su nombre')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ingrese su apellido')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ingrese su DPI/CUI')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ingrese su edad')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ingrese su contraseña')).toBeInTheDocument();
  expect(screen.getByText('Seleccionar rol')).toBeInTheDocument();
  expect(screen.getByText('Registrarse')).toBeInTheDocument();
});

test('Registro Component shows error message on failed registration', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false
  });
  render(<Registro />);
  
  fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su apellido'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su DPI/CUI'), { target: { value: '1234567890123' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su edad'), { target: { value: '25' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Registrarse'));
  
  const errorMessage = await screen.findByText('Esta intentando ingresar a un usuario no admitido');
  expect(errorMessage).toBeInTheDocument();
});

test('Registro Component redirects on successful registration', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true
  });

  const mockLocation = { href: '' };
  delete window.location;
  window.location = mockLocation;

  render(<Registro />);
  
  fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su apellido'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su DPI/CUI'), { target: { value: '1234567890123' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su edad'), { target: { value: '25' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Registrarse'));

  expect(mockLocation.href).toBe('');
});
