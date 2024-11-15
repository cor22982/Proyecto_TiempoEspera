import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from "./TextArea";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("Componente TextArea", () => {
  const onChangeMock = vi.fn();
  const onClickMock = vi.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
    onClickMock.mockClear();
  });

  it("debería mostrar el placeholder inicial y cambiar al área de texto al hacer clic", () => {
    render(
      <TextArea
        placeholder="Escribe un mensaje..."
        onChange={onChangeMock}
        value=""
        onClick={onClickMock}
      />
    );

    // Verifica que muestra el placeholder inicialmente
    expect(screen.getByText("Escribe un mensaje...")).toBeInTheDocument();

    // Simula el clic para abrir el área de texto
    fireEvent.click(screen.getByText("Escribe un mensaje..."));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("debería actualizar el texto en el área de entrada y llamar a onChange", () => {
    render(
      <TextArea
        placeholder="Escribe un mensaje..."
        onChange={onChangeMock}
        value=""
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByText("Escribe un mensaje..."));
    const textArea = screen.getByRole("textbox");

    // Cambiar el valor del texto
    fireEvent.change(textArea, { target: { value: "Hola mundo" } });
    expect(onChangeMock).toHaveBeenCalledWith("Hola mundo");
  });
});
