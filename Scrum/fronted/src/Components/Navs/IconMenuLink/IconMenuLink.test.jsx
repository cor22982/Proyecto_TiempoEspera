import { render, screen, fireEvent } from "@testing-library/react";
import IconMenuLink from "./IconMenuLink";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { vi } from "vitest";

describe("IconMenuLink Component - Pruebas de Seguridad", () => {
  test("debería ejecutar onClick una sola vez por clic", () => {
    const handleClick = vi.fn();
    render(
      <IconMenuLink nombre="Inicio" icono={faHouse} onClick={handleClick} />
    );

    const container = screen.getByTestId("contenedor");
    fireEvent.click(container);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("debería no ejecutar onClick cuando está deshabilitado (si es que es aplicable)", () => {
    const handleClick = vi.fn();
    render(<IconMenuLink nombre="Inicio" icono={faHouse} onClick={null} />);

    const container = screen.getByTestId("contenedor");
    fireEvent.click(container);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("debería manejar correctamente caracteres especiales en `nombre`", () => {
    const nombreConInyeccion = "<script>alert('Hacked!')</script>";
    render(<IconMenuLink nombre={nombreConInyeccion} icono={faHouse} />);

    const textElement = screen.getByTestId("nombre-texto");
    expect(textElement).toHaveTextContent(nombreConInyeccion);
  });

  test("debería ignorar clics adicionales si `onClick` es lenta", async () => {
    const handleClick = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    render(
      <IconMenuLink nombre="Inicio" icono={faHouse} onClick={handleClick} />
    );

    const container = screen.getByTestId("contenedor");

    fireEvent.click(container); // primer clic
    fireEvent.click(container); // segundo clic, debería ignorarse

    expect(handleClick).toHaveBeenCalledTimes(1); // Solo debe contar el primer clic

    await new Promise((resolve) => setTimeout(resolve, 1200)); // Esperar a que el clic termine
  });

  test("debería ignorar clics adicionales si `onClick` es lenta", async () => {
    const handleClick = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    render(
      <IconMenuLink nombre="Inicio" icono={faHouse} onClick={handleClick} />
    );

    const container = screen.getByTestId("contenedor");
    fireEvent.click(container); // primer clic
    fireEvent.click(container); // segundo clic, debería ignorarse

    expect(handleClick).toHaveBeenCalledTimes(1); // Solo debe contar el primer clic
  });
});
