import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";
import styles from "./Checkbox.module.css"; // Importa el módulo CSS
import { expect, vi } from "vitest";

describe("Componente Checkbox", () => {
  it("debería renderizarse con el nombre correcto", () => {
    render(<Checkbox name="Checkbox de Prueba" id="1" onChange={() => {}} />);
    expect(screen.getByText("Checkbox de Prueba")).toBeInTheDocument();
  });

  it('debería alternar el estado "pressed" al hacer clic y llamar a onChange con el id', () => {
    const mockOnChange = vi.fn();
    render(
      <Checkbox name="Checkbox de Prueba" id="1" onChange={mockOnChange} />
    );

    const boton = screen.getByRole("button");
    fireEvent.click(boton);

    // Verifica usando la clase generada a partir del módulo CSS
    expect(boton).toHaveClass(styles["button-checkbox-click"]);
    expect(mockOnChange).toHaveBeenCalledWith("1");
  });

  it("debería cambiar de clase al hacer clic y regresar a su estado original al hacer clic nuevamente", () => {
    const mockOnChange = vi.fn();
    render(
      <Checkbox name="Checkbox de Prueba" id="1" onChange={mockOnChange} />
    );

    const boton = screen.getByRole("button");

    // Primer clic
    fireEvent.click(boton);
    expect(boton).toHaveClass(styles["button-checkbox-click"]);

    // Segundo clic
    fireEvent.click(boton);
    expect(boton).toHaveClass(styles["button-checkbox"]);
  });

  it("debería no permitir múltiples activaciones rápidas que causen errores en el estado", () => {
    const mockOnChange = vi.fn();
    render(<Checkbox name="Prueba Seguridad" id="1" onChange={mockOnChange} />);
    const boton = screen.getByRole("button");

    // Simula varios clics rápidos
    fireEvent.click(boton);
    fireEvent.click(boton);
    fireEvent.click(boton);

    expect(mockOnChange).toHaveBeenCalledTimes(3); // Verifica que onChange sea llamado correctamente
  });
});
