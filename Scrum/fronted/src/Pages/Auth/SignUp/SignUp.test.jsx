import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import SignUp from "./SignUp";

// Redefinir window.location antes de cada prueba
beforeEach(() => {
  // Guardar el original window.location
  const originalLocation = window.location;

  // Crear un objeto simulable para window.location
  delete window.location;
  window.location = { ...originalLocation, reload: vi.fn() };
});

// Restaurar window.location y limpiar mocks después de cada prueba
afterEach(() => {
  vi.clearAllMocks(); // Limpia todas las simulaciones
  vi.restoreAllMocks(); // Restaura todas las funciones espiadas
});

test("SignUp component renders correctly", () => {
  render(<SignUp />);
  expect(screen.getByPlaceholderText("Ingrese su nombre")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Ingrese su apellido")
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Ingrese su DPI/CUI")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Seleccione su fecha de nacimiento")
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Ingrese su contraseña")
  ).toBeInTheDocument();
  expect(screen.getByText("Seleccionar rol")).toBeInTheDocument();
  expect(screen.getByText("Registrarse")).toBeInTheDocument();
});

test("SignUp component shows error message on failed registration", async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: false });

  render(<SignUp />);
  fireEvent.change(screen.getByPlaceholderText("Ingrese su nombre"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Ingrese su apellido"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
    target: { value: "1234567890123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText("Seleccione su fecha de nacimiento"),
    { target: { value: "2000-05-10" } }
  );
  fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText("Registrarse"));

  const errorMessage = await screen.findByText(
    "Esta intentando ingresar a un usuario no admitido"
  );
  expect(errorMessage).toBeInTheDocument();
});

test("SignUp component reloads on successful registration", async () => {
  // Mock del fetch para devolver un response exitoso
  global.fetch = vi.fn().mockResolvedValue({ ok: true });

  render(<SignUp />);

  // Simula el cambio de valores en los campos de entrada
  fireEvent.change(screen.getByPlaceholderText("Ingrese su nombre"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Ingrese su apellido"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
    target: { value: "1234567890123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText("Seleccione su fecha de nacimiento"),
    { target: { value: "2000-05-10" } }
  );
  fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
    target: { value: "password" },
  });

  // Simula el clic en el botón "Registrarse"
  fireEvent.click(screen.getByText("Registrarse"));

  // Verifica si se imprime "success!" en la consola
  await new Promise((resolve) => setTimeout(resolve, 100)); // Espera un poco para que se complete la promesa

  // Asegúrate de que window.location.reload haya sido llamada
  expect(window.location.reload).toHaveBeenCalled();
});
