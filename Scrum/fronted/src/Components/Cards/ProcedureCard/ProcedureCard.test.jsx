import { render, screen, fireEvent } from "@testing-library/react";
import ProcedureCard from "./ProcedureCard";
import { vi } from "vitest";

describe("Componente ProcedureCard", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("debería renderizar el procedimiento correctamente", () => {
    render(
      <ProcedureCard procedure="Procedimiento de prueba" onDelete={() => {}} />
    );
    const procedureText = screen.getByText("Procedimiento de prueba.");
    expect(procedureText).toBeInTheDocument();
  });

  it("debería mostrar el icono de eliminación", () => {
    render(
      <ProcedureCard procedure="Procedimiento de prueba" onDelete={() => {}} />
    );
    const deleteIcon = screen.getByRole("img", { hidden: true });
    expect(deleteIcon).toBeInTheDocument();
  });

  it("debería tener el color de icono en rojo", () => {
    render(
      <ProcedureCard procedure="Procedimiento de prueba" onDelete={() => {}} />
    );
    const deleteButton = screen.getByRole("img", { hidden: true });
    // Verificamos que el color se haya aplicado en el estilo del elemento padre
    expect(deleteButton.parentElement).toHaveStyle("--icon-color: red");
  });

  it("debería llamar a onDelete al hacer clic en el icono de eliminación", () => {
    const mockOnDelete = vi.fn();
    render(
      <ProcedureCard
        procedure="Procedimiento de prueba"
        onDelete={mockOnDelete}
      />
    );
    const deleteButton = screen.getByRole("img", { hidden: true });
    fireEvent.click(deleteButton);

    // Avanza el tiempo para que el debounce entre en efecto
    vi.advanceTimersByTime(300);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("debería llamar a onDelete solo una vez al hacer múltiples clics rápidos en el icono", () => {
    const mockOnDelete = vi.fn();
    render(
      <ProcedureCard
        procedure="Procedimiento de prueba"
        onDelete={mockOnDelete}
      />
    );
    const deleteButton = screen.getByRole("img", { hidden: true });

    // Simula múltiples clics rápidos
    fireEvent.click(deleteButton);
    fireEvent.click(deleteButton);
    fireEvent.click(deleteButton);
    fireEvent.click(deleteButton);

    // Avanza el tiempo para que el debounce entre en efecto
    vi.advanceTimersByTime(300);

    // Verifica que la función solo se haya llamado una vez
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
