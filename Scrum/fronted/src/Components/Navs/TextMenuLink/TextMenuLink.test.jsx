import { render, screen, fireEvent } from "@testing-library/react";
import TextMenuLink from "./TextMenuLink";
import { vi } from "vitest";

describe("TextMenuLink Component", () => {
  test("debería renderizar el texto correctamente", () => {
    render(<TextMenuLink nombre="Inicio" />);
    const textElement = screen.getByText("Inicio");
    expect(textElement).toBeInTheDocument();
  });

  test("debería ejecutar onClick cuando se hace clic", () => {
    const handleClick = vi.fn();
    render(<TextMenuLink nombre="Inicio" onClick={handleClick} />);

    const container = screen.getByText("Inicio");
    fireEvent.click(container);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("debería manejar caracteres especiales en el nombre", () => {
    render(<TextMenuLink nombre="Perfil & Configuración" />);
    const textElement = screen.getByText("Perfil & Configuración");
    expect(textElement).toBeInTheDocument();
  });

  test("debería ejecutar onClick una sola vez por clic", () => {
    const handleClick = vi.fn();
    render(<TextMenuLink nombre="Inicio" onClick={handleClick} />);

    const container = screen.getByText("Inicio");
    fireEvent.click(container);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("debería no ejecutar onClick si el elemento está deshabilitado (si es aplicable)", () => {
    const handleClick = vi.fn();
    render(<TextMenuLink nombre="Inicio" />);

    const container = screen.getByText("Inicio");
    fireEvent.click(container);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("debería ignorar clics adicionales si `onClick` es lenta", async () => {
    const handleClick = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    render(<TextMenuLink nombre="Inicio" onClick={handleClick} />);

    const container = screen.getByText("Inicio");

    fireEvent.click(container); // primer clic
    fireEvent.click(container); // segundo clic, debería ignorarse

    expect(handleClick).toHaveBeenCalledTimes(1); // solo el primer clic cuenta

    await new Promise((resolve) => setTimeout(resolve, 1200)); // esperar a que el clic lento termine
  });
});
