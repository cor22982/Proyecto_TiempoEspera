import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Login from "./LogIn";

// Mock de la función fetch para simular respuestas de la API
global.fetch = vi.fn();

// Mock del hook useToken
vi.mock("@hooks/auth/useToken", () => ({
  default: () => ({
    setToken: vi.fn(), // Simula la función setToken
  }),
}));

describe("Login Component", () => {
  beforeEach(() => {
    // Limpiar cualquier estado previo antes de cada test
    vi.clearAllMocks();
  });

  test("debe mostrar mensaje de error si no se ingresa el DPI/CUI", async () => {
    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => screen.getByText("Por favor, ingresa tu DPI/CUI."));
    expect(
      screen.getByText("Por favor, ingresa tu DPI/CUI.")
    ).toBeInTheDocument();
  });

  test("debe mostrar mensaje de error si no se ingresa la contraseña", async () => {
    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
      target: { value: "12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => screen.getByText("Por favor, ingresa tu contraseña."));
    expect(
      screen.getByText("Por favor, ingresa tu contraseña.")
    ).toBeInTheDocument();
  });

  test("debe mostrar mensaje de error si no se selecciona un rol", async () => {
    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => screen.getByText("Por favor, selecciona un rol."));
    expect(
      screen.getByText("Por favor, selecciona un rol.")
    ).toBeInTheDocument();
  });

  test("debe hacer login exitoso para el rol administrador con datos correctos", async () => {
    // Mock de respuesta exitosa
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ acces_token: "mock_token" }),
      })
    );

    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
      target: { value: "0000000000000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "elMertt44" },
    });

    fireEvent.mouseDown(screen.getByText("Seleccionar rol"));
    fireEvent.click(screen.getByText("administrador"));

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "https://deimoss.web05.lol/login",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("0000000000000"),
      })
    );
  });

  test("debe hacer login exitoso para el rol usuario_comun con datos correctos", async () => {
    // Mock de respuesta exitosa
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ acces_token: "mock_token" }),
      })
    );

    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "123" },
    });

    // Simulamos el clic para abrir el menú y seleccionar el rol "usuario_comun"
    fireEvent.mouseDown(screen.getByText("Seleccionar rol"));
    fireEvent.click(screen.getByText("usuario_comun"));

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    // Esperamos que el fetch haya sido llamado correctamente
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Verificamos que la solicitud fue realizada correctamente con los datos
    expect(fetch).toHaveBeenCalledWith(
      "https://deimoss.web05.lol/login",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("12345"), // Verifica que el DPI sea correcto
      })
    );
  });

  test("debe hacer login exitoso para el rol empleador con datos correctos", async () => {
    // Mock de respuesta exitosa
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ acces_token: "mock_token" }),
      })
    );

    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
      target: { value: "98789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "Empleador" },
    });

    // Simulamos el clic para abrir el menú y seleccionar el rol "empleador"
    fireEvent.mouseDown(screen.getByText("Seleccionar rol"));
    fireEvent.click(screen.getByText("empleador"));

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    // Esperamos que el fetch haya sido llamado correctamente
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Verificamos que la solicitud fue realizada correctamente con los datos
    expect(fetch).toHaveBeenCalledWith(
      "https://deimoss.web05.lol/login",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("98789"), // Verifica que el DPI sea correcto
      })
    );
  });

  test("debe mostrar mensaje de error si las credenciales son incorrectas", async () => {
    // Mock de respuesta con error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "usuario_incorrecto" }),
      })
    );

    render(
      <Login
        onToggle={() => {}}
        onLogin={() => {}}
        onForgotPassword={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese su DPI/CUI"), {
      target: { value: "0000000000000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "incorrectPassword" },
    });
    fireEvent.mouseDown(screen.getByText("Seleccionar rol"));
    fireEvent.click(screen.getByText("administrador"));

    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => screen.getByText("Usuario incorrecto."));
    expect(screen.getByText("Usuario incorrecto.")).toBeInTheDocument();
  });
});
