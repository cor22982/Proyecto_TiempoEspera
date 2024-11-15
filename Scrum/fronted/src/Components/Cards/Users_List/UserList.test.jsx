import { render, screen, fireEvent } from "@testing-library/react";
import Users_List from "./Users_List";
import { vi } from "vitest";
import ImageDefault from "@assets/default_profile.jpg";

describe("Componente Users_List", () => {
  it("debería renderizar el componente correctamente", () => {
    render(
      <Users_List
        onDelete={() => {}}
        name_user="Juan Perez"
        dpi_user="1234567890123"
        imagen_src="https://example.com/user.jpg"
      />
    );
    expect(screen.getByText("Nombre: Juan Perez")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("DPI: 1234567890123"))
    ).toBeInTheDocument();
  });

  it("debería llamar a onDelete cuando se hace clic en el icono de eliminación", () => {
    const onDeleteMock = vi.fn();
    render(
      <Users_List
        onDelete={onDeleteMock}
        name_user="Juan Perez"
        dpi_user="1234567890123"
        imagen_src="https://example.com/user.jpg"
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  it("debería mostrar una imagen de respaldo si la imagen falla en cargar", () => {
    render(
      <Users_List
        onDelete={() => {}}
        name_user="Juan Perez"
        dpi_user="1234567890123"
        imagen_src="https://example.com/invalid-image.jpg"
      />
    );

    const imageElement = screen.getByAltText("User profile");
    fireEvent.error(imageElement);

    expect(imageElement).toHaveAttribute("src", ImageDefault);
  });

  it("debería usar la imagen por defecto si se proporciona una URL de imagen no válida", () => {
    render(
      <Users_List
        onDelete={() => {}}
        name_user="Juan Perez"
        dpi_user="1234567890123"
        imagen_src={null}
      />
    );

    const imageElement = screen.getByAltText("User profile");
    expect(imageElement).toHaveAttribute("src", ImageDefault);
  });

  it("debería renderizar el DPI como texto sin errores", () => {
    const longDPI = "123456789012345678901234567890";
    render(
      <Users_List
        onDelete={() => {}}
        name_user="Juan Perez"
        dpi_user={longDPI}
        imagen_src="https://example.com/user.jpg"
      />
    );

    // Usa coincidencia parcial para el DPI largo
    expect(
      screen.getByText((content) => content.includes(`DPI: ${longDPI}`))
    ).toBeInTheDocument();
  });
});
