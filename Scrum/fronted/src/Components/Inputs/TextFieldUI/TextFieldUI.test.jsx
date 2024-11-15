import { render, screen, fireEvent, act } from "@testing-library/react";
import CustomTextFieldComponent from "./TextFieldUI";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("CustomTextFieldComponent", () => {
  it("debería renderizarse correctamente con el label y el placeholder", () => {
    render(
      <CustomTextFieldComponent
        type="text"
        name="nombre"
        label="Nombre"
        placeholder="Escribe aquí"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escribe aquí")).toBeInTheDocument();
  });

  it("debería llamar a onChange cuando se cambia el valor", () => {
    const handleChange = vi.fn();
    render(
      <CustomTextFieldComponent
        type="text"
        name="nombre"
        label="Nombre"
        placeholder="Escribe aquí"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Escribe aquí"), {
      target: { value: "Nuevo valor" },
    });

    expect(handleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("debería cambiar a tipo 'date' al enfocar el input si el tipo es 'date'", () => {
    render(
      <CustomTextFieldComponent
        type="date"
        name="fecha"
        label="Fecha"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("Fecha");
    fireEvent.focus(input);

    expect(input).toHaveAttribute("type", "date");
  });

  it("debería cambiar a tipo 'time' al enfocar el input si el tipo es 'time'", () => {
    render(
      <CustomTextFieldComponent
        type="time"
        name="hora"
        label="Hora"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("Hora");
    fireEvent.focus(input);

    expect(input).toHaveAttribute("type", "time");
  });

  it("debería aplicar el modo oscuro cuando 'darkMode' está activo en el body", async () => {
    document.body.classList.add("darkMode");
    await act(async () => {
      render(
        <CustomTextFieldComponent
          type="text"
          name="nombre"
          label="Nombre"
          value=""
          onChange={() => {}}
        />
      );
    });

    const input = screen.getByLabelText("Nombre");
    expect(input.parentNode).toHaveStyle({ color: "#A3D1FF" }); // Color de texto en modo oscuro
    document.body.classList.remove("darkMode"); // Restablece la clase
  });

  it("debería aplicar el modo claro cuando 'darkMode' no está activo en el body", async () => {
    await act(async () => {
      render(
        <CustomTextFieldComponent
          type="text"
          name="nombre"
          label="Nombre"
          placeholder="Escribe aquí"
          value=""
          onChange={() => {}}
        />
      );
    });

    const inputContainer = screen
      .getByLabelText("Nombre")
      .closest(".MuiOutlinedInput-root");

    // Verificar el color de fondo en el modo claro (ajuste por background color)
    expect(inputContainer).toHaveStyle("background-color: rgb(255, 255, 255)");
  });

  it("debería actualizar el modo oscuro cuando cambia la clase en el body", async () => {
    const { rerender } = render(
      <CustomTextFieldComponent
        type="text"
        name="nombre"
        label="Nombre"
        value=""
        onChange={() => {}}
      />
    );

    const inputContainer = screen
      .getByLabelText("Nombre")
      .closest(".MuiOutlinedInput-root");

    // Activar el modo oscuro
    await act(async () => {
      document.body.classList.add("darkMode");
      rerender(
        <CustomTextFieldComponent
          type="text"
          name="nombre"
          label="Nombre"
          value=""
          onChange={() => {}}
        />
      );
    });

    // Verificar que el fondo sea el del modo oscuro
    expect(inputContainer).toHaveStyle("background-color: rgb(69, 69, 69)");

    // Quitar modo oscuro y verificar de nuevo
    await act(async () => {
      document.body.classList.remove("darkMode");
      rerender(
        <CustomTextFieldComponent
          type="text"
          name="nombre"
          label="Nombre"
          value=""
          onChange={() => {}}
        />
      );
    });

    expect(inputContainer).toHaveStyle("background-color: rgb(255, 255, 255)");
  });
});
