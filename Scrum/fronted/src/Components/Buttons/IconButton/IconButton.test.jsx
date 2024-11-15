import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./IconButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { expect, vi } from "vitest";

describe("Componente IconButton", () => {
  it("debería renderizar el ícono proporcionado", () => {
    render(<IconButton icono={faCoffee} onclick={() => {}} color="blue" />);

    const iconElement = screen.getByRole("img", { hidden: true });
    expect(iconElement).toBeInTheDocument();
  });

  it("debería mostrar el texto si se proporciona", () => {
    render(
      <IconButton
        icono={faCoffee}
        onclick={() => {}}
        color="blue"
        texto="Texto del Botón"
      />
    );

    const textElement = screen.getByText("Texto del Botón");
    expect(textElement).toBeInTheDocument();
  });

  it("no debería mostrar el texto si no se proporciona", () => {
    render(<IconButton icono={faCoffee} onclick={() => {}} color="blue" />);

    const textElement = screen.queryByText("Texto del Botón");
    expect(textElement).not.toBeInTheDocument();
  });

  it("debería aplicar el color de estilo correctamente", () => {
    render(<IconButton icono={faCoffee} onclick={() => {}} color="red" />);

    const container = screen.getByRole("button");
    expect(container).toHaveStyle({ "--ib-color": "red" });
  });

  it("debería llamar a la función 'onclick' cuando se hace clic en el botón", () => {
    const mockOnClick = vi.fn();
    render(<IconButton icono={faCoffee} onclick={mockOnClick} color="green" />);

    const container = screen.getByRole("button");
    fireEvent.click(container);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
