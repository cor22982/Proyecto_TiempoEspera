import { render, screen, fireEvent } from "@testing-library/react";
import DeletuserCard from "./DeletuserCard";
import { expect, vi } from "vitest";

describe("Componente DeletuserCard", () => {
  it("debería renderizar el nombre, dpi y tipo de usuario correctamente", () => {
    render(
      <DeletuserCard
        name_user="Juan Pérez"
        dpi_user="1234567890"
        type_user="Admin"
        imagen_src="imagen.jpg"
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("1234567890.")).toBeInTheDocument();
    expect(screen.getByText("Nombre: Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Tipo: Admin")).toBeInTheDocument();
  });

  it("debería renderizar la imagen de usuario con la fuente proporcionada", () => {
    render(
      <DeletuserCard
        name_user="Juan Pérez"
        dpi_user="1234567890"
        type_user="Admin"
        imagen_src="imagen.jpg"
        onDelete={() => {}}
      />
    );

    const imageElement = screen.getByAltText("Imagen de usuario");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "imagen.jpg");
  });

  it("debería renderizar el ícono de eliminación", () => {
    render(
      <DeletuserCard
        name_user="Juan Pérez"
        dpi_user="1234567890"
        type_user="Admin"
        imagen_src="imagen.jpg"
        onDelete={() => {}}
      />
    );

    const icons = screen.getAllByRole("img", { hidden: true });
    const deleteIcon = icons.find((icon) =>
      icon.classList.contains("svg-inline--fa")
    );

    expect(deleteIcon).toBeInTheDocument();
  });

  it("debería llamar a la función 'onDelete' al hacer clic en el botón de eliminar", () => {
    const mockOnDelete = vi.fn();
    render(
      <DeletuserCard
        name_user="Juan Pérez"
        dpi_user="1234567890"
        type_user="Admin"
        imagen_src="imagen.jpg"
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { hidden: true });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("debería aplicar el color del ícono correctamente", () => {
    render(
      <DeletuserCard
        name_user="Juan Pérez"
        dpi_user="1234567890"
        type_user="Admin"
        imagen_src="imagen.jpg"
        onDelete={() => {}}
      />
    );

    const deleteIconContainer = screen.getByRole("button", { hidden: true });
    expect(deleteIconContainer).toHaveStyle({ "--icon-color": "red" });
  });
  it("debería renderizar correctamente cuando falta información del usuario", () => {
    render(
      <DeletuserCard
        name_user=""
        dpi_user=""
        type_user="Admin"
        imagen_src=""
        onDelete={() => {}}
      />
    );

    // Verifica que los campos vacíos no provoquen errores
    expect(screen.getByText("Tipo: Admin")).toBeInTheDocument();
  });
});
