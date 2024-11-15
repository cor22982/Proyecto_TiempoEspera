import { render, screen, fireEvent } from "@testing-library/react";
import InputHolder from "./InputHolder";
import { vi } from "vitest";

describe("Componente InputHolder", () => {
  it("debería renderizarse correctamente", () => {
    render(<InputHolder onChange={() => {}} value="" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("debería mostrar el valor inicial correctamente", () => {
    render(<InputHolder onChange={() => {}} value="Valor inicial" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("Valor inicial");
  });

  it("debería llamar a onChange con el nuevo valor al cambiar el input", () => {
    const handleChange = vi.fn();
    render(<InputHolder onChange={handleChange} value="" />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Nuevo valor" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("Nuevo valor");
  });

  it("debería actualizar el valor mostrado cuando cambia la prop `value`", () => {
    const { rerender } = render(
      <InputHolder onChange={() => {}} value="Valor inicial" />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("Valor inicial");

    rerender(<InputHolder onChange={() => {}} value="Valor actualizado" />);
    expect(inputElement).toHaveValue("Valor actualizado");
  });

  it("debería escapar correctamente caracteres HTML especiales", () => {
    const handleChange = vi.fn();
    render(
      <InputHolder
        onChange={handleChange}
        value="<script>alert('XSS')</script>"
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("<script>alert('XSS')</script>");
  });
});
